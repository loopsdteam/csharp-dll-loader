<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <!-- <v-card-title primary-title>
            load dll
          </v-card-title> -->
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>
              load dll
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="!loaded" :disabled="loaded" flat @click="selectDll">select</v-btn>
            <v-btn v-else :disabled="!loaded" flat @click="clearDll">unload</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
               :disabled="loaded"
                label="dll path"
                v-model="dllPath"
                readonly
              ></v-text-field>
              <v-text-field
               :disabled="loaded"
                label="namespace"
                v-model="nameSpace"
              ></v-text-field>
              <v-text-field
               :disabled="loaded"
                label="class name"
                v-model="className"
              ></v-text-field>
              <v-text-field
               :disabled="loaded"
                label="method name"
                v-model="methodName"
              ></v-text-field>
              <v-textarea
               :disabled="loaded"
                label="input json"
                :placeholder="inputPlaceHolder"
                v-model="input"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!loaded" flat color="primary" @click="run">run</v-btn>
            <!-- <v-btn flat color="primary" @click="run">run</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card height="100%">
          <v-toolbar flat color="success" dark>
            <v-toolbar-title>
              results
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="result=''">clear</v-btn>
          </v-toolbar>
          <v-card-text class="mb-0 pb-0">
            <v-textarea box v-model="result" rows="15"></v-textarea>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { remote } from 'electron'
// import * as path from 'path'

export default {
  data () {
    return {
      dllPath: '',
      nameSpace: '',
      className: '',
      methodName: '',
      loaded: false,
      result: '',
      dll: null,
      input: '',
      inputPlaceHolder: '{ "id": "admin", "pw": "qwer1234", "ip": "1.1.1.1", "port": 12345 }'
    }
  },
  mounted () {
    this.nameSpace = localStorage.getItem('nameSpace')
    this.className = localStorage.getItem('className')
    this.methodName = localStorage.getItem('methodName')
    this.input = localStorage.getItem('input')
  },
  methods: {
    selectDll () {
      if (this.loaded) return
      remote.dialog.showOpenDialog({ properties: ['openFile'] }, (rs) => {
        // console.log(rs)
        if (!rs) return
        if (!rs.length) return
        this.dllPath = rs[0]
        try {
          this.dll = this.$edge.func({
            assemblyFile: this.dllPath,
            typeName: `${this.nameSpace}.${this.className}`,
            methodName: this.methodName
          })
          this.loaded = true
        } catch (e) {
          this.result = e.message
        }
      })
    },
    clearDll () {
      this.dll = null
      this.loaded = false
    },
    run () {
      // console.log(this.input)
      // const ip = this.input
      // console.log(JSON.parse(this.input))
      // console.log(JSON.parse('{ "id": "admin", "pw": "qwer1234", "ip": "1.1.1.1", "port": 12345 }'))
      // let obj = {}
      try {
        const obj = JSON.parse(this.input)
        this.dll(obj, (e, result) => {
          if (e) return (this.result = e.message)
          localStorage.setItem('nameSpace', this.nameSpace)
          localStorage.setItem('className', this.className)
          localStorage.setItem('methodName', this.methodName)
          localStorage.setItem('input', this.input)
          this.result = JSON.stringify(result, null, 2)
        })
      } catch (e) {
        this.result = e.message
      }
    }
  }
}
</script>

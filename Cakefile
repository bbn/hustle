fs = require 'fs'
util = require 'util'

{print} = require 'util'
{spawn} = require 'child_process'

exec = (command,exitCallback)->
  tokens = command.split ' '
  x = spawn tokens[0], tokens.slice 1
  x.stderr.on 'data', (data)-> process.stderr.write data.toString()
  x.stdout.on 'data', (data)-> print data.toString()
  x.on 'exit', exitCallback 


CORDOVA_PATH = "../../../../Desktop/cordova"
APP_PATH = "NFF2012"
PACKAGE_NAME = "com.sportsbutter.newformsfest2012"
PROJECT_NAME = "NewFormsFest2012"

task 'build', 'Build phonegap project', (options) ->
  invoke "copywww"

task "create", 'Create phonegap project', (options)->
  console.log "../phonegap-2.0/lib/ios/bin/create #{CORDOVA_PATH}/#{APP_PATH} #{PACKAGE_NAME} #{PROJECT_NAME}"
  exec "../phonegap-2.0/lib/ios/bin/create #{CORDOVA_PATH}/#{APP_PATH} #{PACKAGE_NAME} #{PROJECT_NAME}", (code)->
    print "xcode project created.\n"

task "copywww", 'Copy www directory into build source', (options)->
  exec "cp -R www/ #{CORDOVA_PATH}/#{APP_PATH}/www/", (code)->
    print "copied www.\n"
    invoke "copyconfig"

task "copyconfig", 'Copy configuration into build source', (options)->
  exec "cp config/Cordova.plist #{CORDOVA_PATH}/#{APP_PATH}/#{PROJECT_NAME}/", (code)->
    print "copied config.\n"
    invoke "build-debug"

task "build-debug", 'Build phonegap debug', (options) ->
  exec "#{CORDOVA_PATH}/#{APP_PATH}/cordova/debug", (code)->
    print "emulator exited.\n"
  exec "tail -f #{CORDOVA_PATH}/#{APP_PATH}/console.log", (code)->
    print "tail exited.\n"

task "emulate", 'Launch emulator', (options) ->
  exec "#{CORDOVA_PATH}/#{APP_PATH}/cordova/emulate", (code)->
    print "emulate complete.\n" 
  exec "tail -f #{CORDOVA_PATH}/#{APP_PATH}/console.log", (code)->
    print "tail exited.\n"


sources = 
  "lib":"src"
  "lib/models":"src/models"
  "static/js":"static/coffee"

compile = (lib,src,callback) ->
  coffee = spawn 'coffee', ['-c', '-o', lib, src]
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?(lib,src) if code is 0

browserify = (callback) ->
  x = spawn 'browserify', ['lib/models/models.js','-o','static/js/models.js']
  x.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  x.stdout.on 'data', (data) ->
    print data.toString()
  x.on 'exit', (code) ->
    if code is 0
      print "browserified!\n"
    callback(code)
    

option '-n', '--notest', 'do not run tests'
    

  

task 'freshtest', 'Run tests, wiping test db first', (options) ->
  process.env.freshtest = true
  process.env.testing = true
  process.env.testingDbName = 'picks-testing'
  nano = require("nano") "http://localhost:5984"
  nano.db.destroy "picks-testing", (err,body) ->
    nano.db.create "picks-testing", ->
      updateDesignDocuments {update:true,silent:true}, (err,_) ->
        invoke "jscoverage"


task 'jscoverage', 'Create js-coverage versions of lib files', (options) ->
  d = spawn "rm", ["-rf","covershot"]
  d.stderr.on "data", (data) ->
    process.stderr.write data.toString()
  d.stdout.on 'data', (data) ->
    print data
  d.on 'exit', (code) ->
    d = spawn "rm", ["-rf","lib-cov"]
    d.stderr.on "data", (data) ->
      process.stderr.write data.toString()
    d.stdout.on 'data', (data) ->
      print data
    d.on 'exit', (code) ->
      cov = spawn "jscoverage", ["lib","lib-cov"]
      cov.stderr.on 'data', (data) ->
        process.stderr.write data.toString()
      cov.stdout.on 'data', (data) ->
        print data
      cov.on 'exit', (code) ->
        print "\n+++ lib-cov updated.\n\n"
        invoke "jsmeter"

task "jsmeter", "generate code metrics using jsmeter", (options) ->
  x = spawn "./node_modules/node-jsmeter/bin/jsmeter.js", ["-o","./covershot/jsmeter/","./lib/"]
  x.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  x.stdout.on 'data', (data) ->
    print data
  x.on 'exit', (code) ->
    print "\n+++ code metrics updated.\n\n"
    invoke "test"

option '-tf', '--testfile [FILE]', 'test file to run'

task 'test', 'Run tests', (options) ->
  process.env.testing = true
  process.env.testingDbName = 'picks-testing'
  testfiles = ['test']
  testfiles = [options.testfile] if options.testfile
  tests = spawn "./node_modules/nodeunit/bin/nodeunit", testfiles
  tests.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  tests.stdout.on 'data', (data) ->
    print data
  tests.on 'exit', (code) ->
    print "\n+++ Tests finished. Code: #{code}\n\n"
    invoke "coverage-report"


task 'coverage-report', "Generate a coverage report", (options) ->
  x = spawn "./node_modules/covershot/bin/covershot", ["covershot/data","-f","html","-f","clover","-f","json"]
  x.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  x.stdout.on 'data', (data) ->
    print data
  x.on 'exit', (code) ->
    print "\n+++ coverage report generated.\n"
    print "To view: open covershot/index.html\n\n"



  

   
  

# compare and optionally update design documents

updateDesignDocuments = (options,callback) ->
  pr = (s) ->
    print s unless options.silent
  couch = require "./lib/couch" 
  couch.identifyUnmatchedDesignDocs (err,unmatched) ->
    return callback(err) if err
    return pr("no unmatched design documents.\n") unless unmatched.length > 0
    pr "\nunmatched design documents:\n\n"
    for nonmatch in unmatched
      pr nonmatch.name,"\n"
      pr " new: ",util.inspect(nonmatch.design),"\n"
      pr " old: "
      if nonmatch.old 
        pr util.inspect(nonmatch.old)
      else
        pr "MISSING"
      pr "\n\n"
    return pr("+++ use --update flag to update these.\n\n") unless options.update or process.env.freshtest
    pr "updating...\n"
    count = unmatched.length
    for nonmatch in unmatched
      couch.updateDesignDocument nonmatch.name, nonmatch.design, (err,body,headers) ->
        if err
          pr "ERROR:\n"
          pr util.inspect(err),"\n\n"
          return callback(err)
        pr "SUCCESS:\n"
        pr util.inspect(body),"\n\n"
        return callback(null) unless --count


option '-p', '--production', 'use production couchdb'
option '-t', '--testing', 'use testing couchdb'
option '-u', '--update', 'update design documents (careful!)'

task 'couchdesign', 'check the design of the couchdb document', (options) ->
  if options.testing
    process.env.testing = true
    process.env.testingDbName = 'picks-testing'
  process.env.CLOUDANT_URL = PRODUCTION_CLOUDANT_URL if options.production
  updateDesignDocuments options, (err,info) ->
    console.log "done"
        
  

  


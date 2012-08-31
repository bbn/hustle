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
APP_PATH = "Olio2012"
PACKAGE_NAME = "com.sportsbutter.oliofestival"
PROJECT_NAME = "Olio2012"

task "create", 'Create phonegap project', (options)->
  exec "../phonegap-2.0/lib/ios/bin/create #{CORDOVA_PATH}/#{APP_PATH} #{PACKAGE_NAME} #{PROJECT_NAME}", (code)->
    print "xcode project created.\n"



compile = (lib,src,callback) ->
  exec "coffee -c -o #{lib} #{src}", (code) ->
    callback?(lib,src) if code is 0

sources = 
  "www/js":"www/coffee"

task 'build', 'Build phonegap project', (options) ->
  sourceCount = 0
  for lib,src of sources
    sourceCount += 1
  for lib,src of sources
    compile lib,src, (lib,src) ->
      print "compiled #{src} -> #{lib}\n"
      sourceCount -= 1
      if sourceCount == 0
        print "compiled successfully.\n"
        invoke 'npmupdate'

task "npmupdate", "update npm install", (options) ->
  exec "npm install", (code) ->
    print "node_modules updated.\n"
    invoke "browserify"

task "browserify", "browserify all JS files", (options) ->
  print "browserifying...\n"
  exec "./node_modules/browserify/bin/cmd.js www/js/app.js -o www/js/hustle.js", (code)->
    if code != 0
      print "ERROR BROWSERIFYING"
    else
      print "browserified!\n"
      invoke "copywww"

task "copywww", 'Copy www directory into build source', (options)->
  exec "cp -R www/ #{CORDOVA_PATH}/#{APP_PATH}/www/", (code)->
    print "copied www.\n"
    invoke "copyconfig"

task "copyconfig", 'Copy configuration into build source', (options)->
  exec "cp config/Cordova.plist #{CORDOVA_PATH}/#{APP_PATH}/#{PROJECT_NAME}/", (code)->
    print "copied config.\n"
    invoke "copyicons"

task "copyicons", "Copy icon files", (options)->
  exec "cp -R icons/ #{CORDOVA_PATH}/#{APP_PATH}/#{PROJECT_NAME}/Resources/icons", (code)->
    print "copied icons.\n"
    invoke "copysplash"

task "copysplash", "Copy splash files", (options)->
  exec "cp -R splash/ #{CORDOVA_PATH}/#{APP_PATH}/#{PROJECT_NAME}/Resources/splash", (code)->
    print "copied splash.\n"
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






    

option '-n', '--notest', 'do not run tests'
    

  


  


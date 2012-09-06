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


data = fs.readFileSync "./config/app-info.json"
appConfig = JSON.parse data


task "create", 'Create phonegap project', (options)->
  fs.readdir appConfig.buildPath, (err,data) ->
    fs.mkdirSync appConfig.buildPath if err
    exec "../phonegap-2.0/lib/ios/bin/create #{appConfig.buildPath}/#{appConfig.appPath} #{appConfig.packageName} #{appConfig.projectName}", (code)->
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
  exec "cp -R www/ #{appConfig.buildPath}/#{appConfig.appPath}/www/", (code)->
    print "copied www.\n"
    invoke "copyconfig"

task "copyconfig", 'Copy configuration into build source', (options)->
  exec "cp config/Cordova.plist #{appConfig.buildPath}/#{appConfig.appPath}/#{appConfig.projectName}/", (code)->
    print "copied config.\n"
    invoke "copyicons"

task "copyicons", "Copy icon files", (options)->
  exec "cp -R icons/ #{appConfig.buildPath}/#{appConfig.appPath}/#{appConfig.projectName}/Resources/icons", (code)->
    print "copied icons.\n"
    invoke "copysplash"

task "copysplash", "Copy splash files", (options)->
  exec "cp -R splash/ #{appConfig.buildPath}/#{appConfig.appPath}/#{appConfig.projectName}/Resources/splash", (code)->
    print "copied splash.\n"
    invoke "build-debug"


task "build-debug", 'Build phonegap debug', (options) ->
  exec "#{appConfig.buildPath}/#{appConfig.appPath}/cordova/debug", (code)->
    print "emulator exited.\n"
  exec "tail -f #{appConfig.buildPath}/#{appConfig.appPath}/console.log", (code)->
    print "tail exited.\n"

task "emulate", 'Launch emulator', (options) ->
  exec "#{appConfig.buildPath}/#{appConfig.appPath}/cordova/emulate", (code)->
    print "emulate complete.\n" 
  exec "tail -f #{appConfig.buildPath}/#{appConfig.appPath}/console.log", (code)->
    print "tail exited.\n"






    

option '-n', '--notest', 'do not run tests'
    

  


  


//
//  ViewController.swift
//  SwiftWebViewBridgeDemo
//
//  Created by KKING on 17/5/26.
//  Copyright © 2017年 ShawnFoo. All rights reserved.
//

import UIKit

// if you install SwiftWebViewBridge by Cocoapods, please remember to import it
// import SwiftWebViewBridge

class ViewController: UIViewController {
    
    // already set delegate to current ViewController in storyboard
    @IBOutlet weak var webView: UIWebView!
    
    @IBOutlet weak var sendDataToJSBt: UIButton!
    
    @IBOutlet weak var sendDataToJSWithCallBackBt: UIButton!
    
    @IBOutlet weak var callJSHandlerBt: UIButton!
    
    @IBOutlet weak var callJSHandlerWithCallBackBt: UIButton!
    
    fileprivate var bridge: SwiftWebViewBridge!
    
    
    var displayLink: CADisplayLink?

    // MARK: LifeCycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.bridge = SwiftWebViewBridge.bridge(webView, defaultHandler: { data, responseCallback in
            print("Swift received message from JS: \(data)")
            // Actually, this responseCallback could be an empty closure when javascript has no callback, saving you from unwarping an optional parameter = )
            // responseCallback is modified by @escaping
            DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 1.0) {
                // Simulating the situation that needs to do some   asynchronous tasks
                responseCallback(["msg": "Swift already got your msg, thanks"])
            }
        })
        
        //  SwiftJavaScriptBridge.logging = false
        
        self.bridge.registerHandlerForJS(handlerName: "printReceivedParmas", handler: { [unowned self] jsonData, responseCallback in
            // if you used self in any bridge handler/callback closure, remember to declare weak or unowned self, preventing from retaining cycle!
            // Because VC owned bridge, brige owned this closure, and this cloure captured self!
            self.printReceivedParmas(jsonData)
            responseCallback([
                "msg": "Swift has already finished its handler",
                "returnValue": [1, 2, 3]
                ])
        })
        
        
        self.loadLocalWebPage()
    }
}

// MARK: - UIViewController + UIWebViewDelegate

extension ViewController: UIWebViewDelegate {
    
    func webViewDidFinishLoad(_ webView: UIWebView) {

            self.sendDataToJSBt.isEnabled = true
            self.sendDataToJSWithCallBackBt.isEnabled = true
            self.callJSHandlerBt.isEnabled = true
            self.callJSHandlerWithCallBackBt.isEnabled = true
    }
    
    func webView(_ webView: UIWebView, didFailLoadWithError error: Error) {
        print("\(error)")
    }
}

// MARK: - ViewController + Actions
extension ViewController {
    
    func internalInit() {
        displayLink = CADisplayLink(target: self, selector: #selector(displayLinkTick))
        displayLink?.add(to: RunLoop.main, forMode: .defaultRunLoopMode)
    }
    
    
    internal func displayLinkTick() {

        DispatchQueue.global().async {
            let x = arc4random()/200000
            DispatchQueue.main.async(execute: {
                self.bridge.sendDataToJS(["signalVoltage": "\(x)","counter": "104000"])
            })
        }
    }
    
    
    @IBAction func sendDataToJS(_ sender: AnyObject) {
        internalInit()
    }
    
    @IBAction func sendDataToJSWithCallback(_ sender: AnyObject) {
        self.bridge.sendDataToJS(["signalVoltage":"15000"], responseCallback: { data in
            print("Receiving JS return gift: \(data)")
        })
    }
    
    @IBAction func callJSHandler(_ sender: AnyObject) {
        self.bridge.callJSHandler("alertReceivedParmas", params: ["signalVoltage": "15000","counter": "104000"], responseCallback: nil)
    }
    
    @IBAction func callJSHandlerWithCallback(_ sender: AnyObject) {
        self.bridge.callJSHandler("alertReceivedParmas", params: ["msg": "JS, I know you there!"]) { data in
            print("Got response from js: \(data)")
        }
    }
    
    fileprivate func printReceivedParmas(_ data: AnyObject) {
        print("Swift recieved data passed from JS: \(data)")
    }
    
    fileprivate func loadLocalWebPage() {
        
        guard let urlPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "remote") else {
            print("Couldn't find the index.html file in bundle!")
            return
        }
        
        let request = URLRequest(url: URL(string: urlPath)!)
        self.webView.loadRequest(request)
        
        
        //demo
        //        guard let urlPath = Bundle.main.path(forResource: "Demo", ofType: "html", inDirectory: nil) else {
        //            print("Couldn't find the index.html file in bundle!")
        //            return
        //        }
        //
        //        let request = URLRequest(url: URL(string: urlPath)!)
        //        self.webView.loadRequest(request)
        
        
    }
}


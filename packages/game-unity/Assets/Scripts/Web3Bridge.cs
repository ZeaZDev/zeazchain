/*
 * ZeaZChain Unity Game
 * Author: ZeaZDev Meta-Intelligence
 * C# script for bridging WebGL game with browser JavaScript.
 */
using UnityEngine;
using System.Runtime.InteropServices;

public class Web3Bridge : MonoBehaviour
{
    // Import the JavaScript function from the browser
    [DllImport("__Internal")]
    private static extern void RequestSignature(string message);

    // Call this from a Unity Button event
    public void SignMessage()
    {
        string messageToSign = "Welcome to ZeaZChain GameFi!";
        #if UNITY_WEBGL == true && UNITY_EDITOR == false
            RequestSignature(messageToSign);
        #else
            Debug.Log("Web3 calls only available in WebGL build.");
        #endif
    }

    // This function will be called *from* browser JavaScript
    public void OnSignatureReceived(string signature)
    {
        Debug.Log("Signature received in Unity: " + signature);
        // TODO: Send signature to NestJS backend for verification
    }

    // This function will be called *from* browser JavaScript
    public void OnError(string error)
    {
        Debug.LogError("Web3 Error: " + error);
    }
}

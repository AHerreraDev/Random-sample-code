//
//  ViewController.swift
//  Xylophone
//  Alejandro Sanchez 10/12/2017


import UIKit
import AVFoundation // Required for audio

class ViewController: UIViewController, AVAudioPlayerDelegate{
  
    var audioPlayer : AVAudioPlayer!;
    var wavesArray = ["note1", "note2", "note3", "note4", "note5", "note6", "note7"];
    var selectedSoundFile = "";

    override func viewDidLoad() {
     super.viewDidLoad()
    }



  @IBAction func notePressed(_ sender: UIButton) {
    
    selectedSoundFile = wavesArray[sender.tag - 1];
    playSound();
    
  }
  
  
  func playSound() {
  
    // Lets define the path of the music file
    let soundURL = Bundle.main.url(forResource: selectedSoundFile, withExtension: "wav")
    
    do {
      audioPlayer = try AVAudioPlayer(contentsOf: soundURL!)
      
      //Catch eny error (if theres any) and print it in the console
    } catch {
      print(error)
    }
    
    // Play the sound
    audioPlayer.play();
  }

}

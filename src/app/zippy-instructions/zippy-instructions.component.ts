import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zippy-instructions',
  templateUrl: './zippy-instructions.component.html',
  styleUrls: ['./zippy-instructions.component.css']
})
export class ZippyInstructionsComponent implements OnInit {

@Input('seotype')
seotype: string;
instructions: string;

  isExpanded: boolean;
  constructor() {
   }
  generateInstructions(){
    switch(this.seotype){
      case "amazon":
        this.instructions = this.getAmazonInstructions();
        break;
      default:
        this.instructions = "Not Available"
        break;
    }
  }

  getAmazonInstructions(){
    let html = [];

    html.push(
      "<h3>Getting Seed Keywords</h3>",
      '<p>You can either seed the keyword tool via using our search tool, type in a search phrase such as "fidget spinners", ',
      "and a list of keywords will be generated for you.</p><p>Or...</p>",
      "<p>If you have a .csv file generated from another keyword tool site, just be sure the column of keywords has a <b>HEADER</b> with the name of <b>Keyword</b>. ",
      "Upload the file from your computer and terms will be broken down into individual words and their occurrences counted for you.</p>",
      "<h3>Generating Tags</h3>",
      "<p>Once the table has been populated with the information from your file or search, you'll be ready to generate your tag fields for Amazon.",
      "In order to do so, you will have to click and select on the keywords you wish to include in tag generation. When you have selected all the tags you'd like to use, click the Generate Tags button, ",
      "and a maximum of 5 lines of 50 characters each will be generated for you. You can click on the copy button next to each line and paste to your listing."
  );
    return html.join("");
  }
  zippyToggle(){
    this.isExpanded = !this.isExpanded;
  }
  ngOnInit() {
    this.generateInstructions();
  }

}

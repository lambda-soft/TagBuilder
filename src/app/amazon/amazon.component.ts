//import { ZippyInstructionsComponent } from './../zippy-instructions/zippy-instructions.component';
import { element } from 'protractor';
import { AmazonAutoCompleteService } from './../services/amazon-auto-complete.service';
import { Component, OnInit } from '@angular/core';
import 'jquery';
import * as alaSQLSpace from 'alasql';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.css']
})
export class AmazonComponent implements OnInit {

  sortedWords = [];
  isLoading = false;
  isError = false;

  constructor(private service: AmazonAutoCompleteService) {
  }

  ngOnInit() {
  }
  isPreposition(x: string){
    let prepArray = [
      "with","at","from","into","during","including","until","against","among",
      "throughout","despite","towards","upon","concerning","of","to","in","for",
      "on","by","about","like","through","over","before","between","after","since",
      "without","under","within","along","following","across","behind","beyond","plus",
      "except","but","up","out","around","down","off","above","near"
    ];
    let isPrep = false;
    prepArray.forEach(element => {
      if (x == element)
        isPrep = true;
    });
    return isPrep;
  }
  searchTermBuilder(terms: Array<string>){
    let builtTerms = [];
    let tempTerms = terms.filter((val) =>{
        return !this.isPreposition(val);
    })

    for(let i = 0; i < tempTerms.length; i++){
      for (let j = 0; j < tempTerms.length; j++) {
        if(j != i)
          builtTerms.push(tempTerms[i]+" "+tempTerms[j]);
      }
    }
    return builtTerms;
  }
  createSortedWords(keyWordCountDict) {
    let tempSortArray = [];
    let tempSortedWords = [];

    for (let key in keyWordCountDict) {
      tempSortArray.push([key, keyWordCountDict[key]]);
    }
    tempSortArray.sort((a, b) => {
      return a[1] - b[1];
    })
      .reverse();
    tempSortArray.forEach(element => {
      tempSortedWords.push({
        Keyword: element[0],
        Count: element[1]
      });
    });

    return tempSortedWords;
  }
  createTagsArray() {
    let tempTags = [];
    let table = $('#keyWordCountTable tr');
    table.each(function (index, row) {
      var line = $(row);
      if (line.hasClass('bg-success'))
        tempTags.push(line.children(":first").text());
    });
    return tempTags;
  }
  createLimitedKeywordsArray(tags) {
    let lineLimit = 5;
    let lineNum = 0;
    let tagline = "";
    let tempArray = [];
    tags.forEach(function (element) {
      if (lineNum <= lineLimit) {
        if ((tagline + element).length > 50) {
          tempArray.push(tagline);
          lineNum++;
          tagline = "";
          tagline += (element + " ");
        }
        else
          tagline += (element + " ");
      }
    }, this);
    if (tagline != "")
      tempArray.push(tagline);

    return tempArray;
  }
  displayTags(arr) {
    arr.forEach((element, index) => {
      $('#keyWordBuilt' + index).val(element);
    });
  }
  generateSearchKeywords(term: string, iteration: number, keywords, terms?: Array<string>) {
    // if(terms == null)
    //   terms = this.searchTermBuilder(term.split(' '));
    if(!this.isLoading)
      this.isLoading = !this.isLoading;
    if (keywords.length < 500) {
      this.service.generateKeywordList(term)
        .subscribe(result => {
          result[1].forEach(element => {
            keywords.push({
              Keyword: element
            });
          });
          try {
            this.isError = false;
            if (terms == null)
              terms = this.searchTermBuilder(result[1][1].split(' '));
            if (iteration < 5)
              if (result[1][0] != null) {
                if (terms.length == 0)
                  terms = this.searchTermBuilder(result[1][0].split(' '));
                this.generateSearchKeywords(result[1][0], iteration + 1, keywords, terms);

              }
              else {
                let temp = terms.pop();
                this.generateSearchKeywords(temp, 1, keywords, terms);
              }
            else {
              let temp = terms.pop();
              this.generateSearchKeywords(temp, 1, keywords, terms);
            }
          }
          catch (ex) {
            this.isError = true;
            this.isLoading = !this.isLoading;
          }
        });
    }
    else{
      this.isLoading = false;
      this.processKeywordData(keywords);
    }
  }
  resetTable() {
    $('.tdata').remove();
  }
  resetTagFields() {
    $('.tagHelper').val("");
  }
  resetDisplays() {
    this.resetTable()
    this.resetTagFields();
  }

  toggleSelect(event) {
    let el = $(event.target).parent();
    if ($(el).hasClass('bg-success'))
      $(el).removeClass('bg-success');
    else
      $(el).addClass('bg-success');
  }

  loadFile(event) {
    alasql('SELECT * FROM FILE(?,{headers:true})', [event], (data) => {
      // Process data here
      this.resetDisplays();
      this.processKeywordData(data);
    });
  }

  createKeywordCountDict(uniqueArr, kWordArr) {
    let tempDict = {};

    uniqueArr.forEach(uniqueElement => {
      tempDict[uniqueElement] = 0;
      kWordArr.forEach(element => {
        if (element === uniqueElement)
          tempDict[uniqueElement]++;
      });
    });

    return tempDict;
  }

  createKeywordArray(keywords) {
    let fullKeywordString = "";

    keywords.forEach(element => {
      fullKeywordString += element.Keyword + " ";
    });

    return fullKeywordString.split(' ');
  }

  isUnique(arr: Array<String>, word: String) {
    arr.forEach((el, index) => {
      if (el === word)
        return false;
    });
    return true;
  }

  getUniqueWords(arr: Array<String>) {
    let tempArray = [];
    arr.filter((item, index, arr) => {
      if (this.isUnique(tempArray, item)) {
        tempArray.push(item);
      }
    });

    return tempArray;
  }

  processKeywordData(keywords) {

    let keywordArray = this.createKeywordArray(keywords);
    let uniqueKeywordArray = this.getUniqueWords(keywordArray);
    let keyWordCountDict = this.createKeywordCountDict(uniqueKeywordArray, keywordArray);

    this.sortedWords = this.createSortedWords(keyWordCountDict);
  }

  copyTags(event){
    let parent = $(event.target).parent();
    if(!$(parent).is("div"))
      parent = $(parent).parent();
    let childID = $(parent).children("input").attr('id');

    let copyText = (document.getElementById(childID)) as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
  }
  generateTags() {
    this.resetTagFields();
    let tags = this.createTagsArray();
    let limitedKeywordArray = this.createLimitedKeywordsArray(tags);

    this.displayTags(limitedKeywordArray);
  }
  keywordFromSearch(event) {
    let keywords = [];
    let parent = $(event.target).parent();
    if($(parent).is("button"))
      parent = $(parent).parent();
    
    let searchQuery = (($(parent).children("input").val()) as string).toLowerCase();
    
    this.resetDisplays();
    this.generateSearchKeywords(searchQuery, 1, keywords);
  }
}
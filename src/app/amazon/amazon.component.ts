import { Component, OnInit } from '@angular/core';
import 'jquery';
import * as alaSQLSpace from 'alasql';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.css']
})
export class AmazonComponent implements OnInit {

  private sortedWords = [];
  constructor() {
  }

  ngOnInit() {
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
    let el = event.originalTarget.parentElement;
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

  generateTags() {
    this.resetTagFields();

    let tags = this.createTagsArray();
    let limitedKeywordArray = this.createLimitedKeywordsArray(tags);

    this.displayTags(limitedKeywordArray);
  }

}
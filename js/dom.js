export const $ = (sel) => document.querySelector(sel);

export const els = () => ({
  screenStart: $("#screenStart"),
  screenGame: $("#screenGame"),

  identityGrid: $("#identityGrid"),
  identityPicked: $("#identityPicked"),
  inputName: $("#inputName"),
  selectGender: $("#selectGender"),
  btnStartLife: $("#btnStartLife"),
  startStatus: $("#startStatus"),
  btnReset: $("#btnReset"),

  btnBackToStart: $("#btnBackToStart"),
  btnNextYear: $("#btnNextYear"),
  lockNote: $("#lockNote"),

  avatarCaption: $("#avatarCaption"),
  sidebarIdentity: $("#sidebarIdentity"),

  statAge: $("#statAge"),
  statBackground: $("#statBackground"),
  statEducation: $("#statEducation"),
  statSchool: $("#statSchool"),
  statMajor: $("#statMajor"),
  statDegree: $("#statDegree"),
  statMoney: $("#statMoney"),
  statHobby: $("#statHobby"),
  statGrade: $("#statGrade"),
  statReputation: $("#statReputation"),

  barHealth: $("#barHealth"),
  barHope: $("#barHope"),
  barTrust: $("#barTrust"),
  barConn: $("#barConn"),
  barHealthVal: $("#barHealthVal"),
  barHopeVal: $("#barHopeVal"),
  barTrustVal: $("#barTrustVal"),
  barConnVal: $("#barConnVal"),

  timelineSub: $("#timelineSub"),
  eventTitle: $("#eventTitle"),
  eventBody: $("#eventBody"),
  choiceRow: $("#choiceRow"),
  lifeLog: $("#lifeLog"),
});
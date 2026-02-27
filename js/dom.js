export const $ = (sel) => document.querySelector(sel);

export const els = () => ({
  screenStart: $("#screenStart"),
  screenGame: $("#screenGame"),

  identityGrid: $("#identityGrid"),
  identityPicked: $("#identityPicked"),
  inputName: $("#inputName"),
  selectGender: $("#selectGender"),
  selectLocation: $("#selectLocation"),

  btnStartLife: $("#btnStartLife"),
  startStatus: $("#startStatus"),
  btnReset: $("#btnReset"),

  btnBackToStart: $("#btnBackToStart"),
  btnNextYear: $("#btnNextYear"),
  lockNote: $("#lockNote"),

  avatarCaption: $("#avatarCaption"),
  sidebarIdentity: $("#sidebarIdentity"),

  statAge: $("#statAge"),
  statLocation: $("#statLocation"),
  statBackground: $("#statBackground"),
  statEducation: $("#statEducation"),
  statMoney: $("#statMoney"),
  statHobby: $("#statHobby"),
  statGrade: $("#statGrade"),
  statReputation: $("#statReputation"),
  statRecord: $("#statRecord"),

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
export const $ = (sel) => document.querySelector(sel);

export const els = () => ({
  // screens
  screenStart: $("#screenStart"),
  screenGame: $("#screenGame"),

  // start screen
  identityGrid: $("#identityGrid"),
  identityPicked: $("#identityPicked"),
  btnPickHobby: $("#btnPickHobby"),
  hobbyPicked: $("#hobbyPicked"),
  btnStartLife: $("#btnStartLife"),
  startStatus: $("#startStatus"),
  btnReset: $("#btnReset"),

  // modal
  modalOverlay: $("#modalOverlay"),
  hobbyModal: $("#hobbyModal"),
  hobbyGrid: $("#hobbyGrid"),
  btnCloseModal: $("#btnCloseModal"),
  btnConfirmHobby: $("#btnConfirmHobby"),
  modalHint: $("#modalHint"),

  // game screen
  btnBackToStart: $("#btnBackToStart"),
  btnNextYear: $("#btnNextYear"),

  sidebarIdentity: $("#sidebarIdentity"),
  statAge: $("#statAge"),
  statBackground: $("#statBackground"),
  statEducation: $("#statEducation"),
  statMoney: $("#statMoney"),
  statHobby: $("#statHobby"),

  barHealth: $("#barHealth"),
  barHope: $("#barHope"),
  barTrust: $("#barTrust"),
  barConn: $("#barConn"),
  barHealthVal: $("#barHealthVal"),
  barHopeVal: $("#barHopeVal"),
  barTrustVal: $("#barTrustVal"),
  barConnVal: $("#barConnVal"),

  yearChip: $("#yearChip"),
  timelineSub: $("#timelineSub"),
  eventTitle: $("#eventTitle"),
  eventBody: $("#eventBody"),
  choiceRow: $("#choiceRow"),
  lifeLog: $("#lifeLog"),
});

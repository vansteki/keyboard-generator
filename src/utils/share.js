export const hostname = `${location.hostname}:8000`

export const maintaining = () => {
  $("#people").text("發電機維護中")
};

export const syncVisitor = visitor => {
  $("#people").text("目前有"+visitor+"個人在愛地球")
};

export const syncBulb = per => {
  $("#per").text(per + "%")
  $("#mask").css("height", 2.8 * per + "px")
};

export const displayResult = () => {
  $("#prize").show()
  $("#sound").get(0).play()
};

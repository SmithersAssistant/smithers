export default robot => {
  robot.listen(/^add tab (.*)$/, {
    description: "Add a tab",
    usage: "add tab <name>"
  }, res => robot.addTab(res.matches[1] || "Untitled"));

  robot.listen(/^edit tab (.*)$/, {
    description: "Edit current tab",
    usage: "edit tab <name>"
  }, res => robot.editTab(res.matches[1] || "Untitled"));

  robot.listen(/^hide tabs$/, {
    description: "Hide tabs",
    usage: "hide tab"
  }, () => robot.hideTabs());

  robot.listen(/^show tabs$/, {
    description: "Show tabs",
    usage: "show tab"
  }, () => robot.showTabs());

  robot.listen(/^close tab$/, {
    description: "Remove current tab",
    usage: "close tab"
  }, () => robot.removeTab());

  robot.listen(/^close left$/, {
    description: "Remove tabs to the left",
    usage: "close left"
  }, () => robot.removeTabsToTheLeft());

  robot.listen(/^close right$/, {
    description: "Remove tabs to the right",
    usage: "close right"
  }, () => robot.removeTabsToTheRight());

  robot.listen(/^close other$/, {
    description: "Remove other tabs",
    usage: "close other"
  }, () => robot.removeOtherTabs());

  robot.listen(/^prev tab$/, {
    description: "Focus tab to the left",
    usage: "prev tab"
  }, () => robot.focusPrevTab());

  robot.listen(/^next tab$/, {
    description: "Focus tab to the right",
    usage: "next tab"
  }, () => robot.focusNextTab());

  robot.listen(/^move tab left$/, {
    description: "Move tab to the right",
    usage: "move tab left"
  }, () => robot.moveTabToTheLeft());

  robot.listen(/^move tab right$/, {
    description: "Move tab to the right",
    usage: "move tab right"
  }, () => robot.moveTabToTheRight());

  robot.listen(/^prev tab (\d*)$/, {
    description: "Focus tab to the left",
    usage: "prev tab <places_to_the_left>"
  }, res => robot.focusPrevTab(res.matches[1]));

  robot.listen(/^next tab (\d*)$/, {
    description: "Focus tab to the right",
    usage: "next tab <places_to_the_right>"
  }, res => robot.focusNextTab(res.matches[1]));

}

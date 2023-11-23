import { ViewTypes as ViewType } from "./helpers";
import SummaryPos from "./SummaryPos";

export default {
  schedulerWidth: "100%",
  besidesWidth: 20,
  schedulerMaxHeight: 0,
  tableHeaderHeight: 40,
  schedulerContentHeight: "fit-content",

  responsiveByParent: false,

  agendaResourceTableWidth: 160,
  agendaMaxEventWidth: 100,

  dayResourceTableWidth: 160,
  weekResourceTableWidth: "20rem",
  monthResourceTableWidth: 160,
  quarterResourceTableWidth: 160,
  yearResourceTableWidth: 160,
  customResourceTableWidth: 160,

  dayCellWidth: 30,
  weekCellWidth: "12%",
  monthCellWidth: 80,
  quarterCellWidth: 80,
  yearCellWidth: 80,
  customCellWidth: 80,

  dayMaxEvents: 99,
  weekMaxEvents: 99,
  monthMaxEvents: 99,
  quarterMaxEvents: 99,
  yearMaxEvents: 99,
  customMaxEvents: 99,

  eventItemPopoverTrigger: "hover",
  eventItemPopoverPlacement: "bottomLeft",
  eventItemPopoverWidth: 300,

  eventItemHeight: 22,
  eventItemLineHeight: 24,
  nonAgendaSlotMinHeight: 0,
  dayStartFrom: 0,
  dayStopTo: 23,
  defaultEventBgColor: "#80C5F6",
  selectedAreaColor: "#00000033",
  nonWorkingTimeHeadColor: "#999999",
  nonWorkingTimeHeadBgColor: "#fff0f6",
  nonWorkingTimeBodyBgColor: "#fff0f6",
  summaryColor: "#666",
  summaryPos: SummaryPos.TopRight,
  groupOnlySlotColor: "#F8F8F8",

  startResizable: true,
  endResizable: true,
  movable: true,
  creatable: true,
  crossResourceMove: true,
  checkConflict: false,
  scrollToSpecialDayjsEnabled: true,
  eventItemPopoverEnabled: true,
  calendarPopoverEnabled: true,
  recurringEventsEnabled: true,
  viewChangeSpinEnabled: true,
  dateChangeSpinEnabled: true,
  headerEnabled: true,
  resourceViewEnabled: true,
  displayWeekend: true,
  relativeMove: true,
  defaultExpanded: true,
  dragAndDropEnabled: true,

  schedulerHeaderEventsFuncsTimeoutMs: 100,

  resourceName: "Resource Name",
  taskName: "Task Name",
  agendaViewHeader: "Agenda",
  addMorePopoverHeaderFormat: "MMM D, YYYY dddd",
  eventItemPopoverDateFormat: "MMM D",
  nonAgendaDayCellHeaderFormat: "ha",
  nonAgendaOtherCellHeaderFormat: "ddd M/D",

  minuteStep: 30,
  availability: ["day", "week"],

  parentView: [
    {
      viewName: "Projects"
    },
    {
      viewName: "Team"
    }
  ],
  selectedParent: 1,
  views: [
    {
      viewName: "Day",
      viewType: ViewType.Day,
      showAgenda: false,
      isEventPerspective: false
    },
    {
      viewName: "Week",
      viewType: ViewType.Week,
      showAgenda: false,
      isEventPerspective: false
    },
    {
      viewName: "Month",
      viewType: ViewType.Month,
      showAgenda: false,
      isEventPerspective: false
    },
    {
      viewName: "Quarter",
      viewType: ViewType.Quarter,
      showAgenda: false,
      isEventPerspective: false
    },
    {
      viewName: "Year",
      viewType: ViewType.Year,
      showAgenda: false,
      isEventPerspective: false
    }
  ]
};
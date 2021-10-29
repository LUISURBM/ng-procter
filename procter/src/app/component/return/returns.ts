

export const returns = [
    {
        "Color": { type: "string" },
        "Country": { type: "string", dimensionUniqueName: "Geography" },
        "State": { type: "string", dimensionUniqueName: "Geography" },
        "City": { type: "string", dimensionUniqueName: "Geography" },
        "Price": { type: "number" },
        "Quantity": { type: "number" }
    },
    {
        "Color": "green",
        "Country": "Canada",
        "State": "Ontario",
        "City": "Toronto",
        "Price": 174,
        "Quantity": 22
    },
    {
        "Color": "red",
        "Country": "USA",
        "State": "California",
        "City": "Los Angeles",
        "Price": 166,
        "Quantity": 19
    }
];

export const returnsCfg = {
    dataSource: {
        data: returns
    },
    options: {
        "viewType": "grid",
        "grid": {
            "type": "flat",
            "title": "",
            "showFilter": true,
            "showHeaders": true,
            "showTotals": "on",
            "showGrandTotals": "on",
            "grandTotalsPosition": "top",
            "showExtraTotalLabels": false,
            "showHierarchies": true,
            "showHierarchyCaptions": true,
            "drillthroughMaxRows": 1000,
            "showReportFiltersArea": true,
            "dragging": true,
            "showAutoCalculationBar": true,
            "showEmptyValues": false
        },
        "chart": {
            "type": "column",
            "title": "",
            "showFilter": true,
            "multipleMeasures": false,
            "oneLevel": false,
            "autoRange": false,
            "reversedAxes": false,
            "showLegend": true,
            "showLegendButton": false,
            "showDataLabels": false,
            "showAllLabels": false,
            "showMeasures": true,
            "showOneMeasureSelection": true,
            "showWarning": true,
            "activeMeasure": {}
        },
        "filter": {
            "weekOffset": 1,
            "dateFormat": "dd/MM/yyyy",
            "liveSearch": true
        },
        "configuratorActive": false,
        "configuratorButton": true,
        "showAggregations": true,
        "showCalculatedValuesButton": true,
        "grouping": false,
        "editing": false,
        "drillThrough": true,
        "showDrillThroughConfigurator": true,
        "sorting": "on",
        "defaultDateType": "date",
        "strictDataTypes": false,
        "datePattern": "dd/MM/yyyy",
        "dateTimePattern": "dd/MM/yyyy HH:mm:ss",
        "saveAllFormats": false,
        "showDefaultSlice": true,
        "useOlapFormatting": false,
        "showMemberProperties": false,
        "showEmptyData": true,
        "defaultHierarchySortName": "asc",
        "showOutdatedDataAlert": false,
        "showAggregationLabels": true,
        "sortAlphabetically": [],
        "showAllFieldsDrillThrough": false,
        "liveFiltering": false,
        "showFieldListSearch": false,
        "validateFormulas": true,
        "caseSensitiveMembers": false,
        "simplifyFieldListFolders": false,
        "validateReportFiles": true,
        "fieldListPosition": undefined,
        "allowBrowsersCache": false
    },
    slice: {
        columns: [
            { uniqueName: "reg_status" },
            { uniqueName: "returnid" },
            { uniqueName: "referencenumber" },
            { uniqueName: "commentario" },
            { uniqueName: "pickupdate" },
            { uniqueName: "creation_date" }
        ]
    }
}
(function () {'use strict';
/**
 * generate directive link function
 *
 * @param {Service} $http, http service to make ajax requests from angular
 * @param {String} type, chart type
 */
function getLinkFunction($http, $timeout, theme, util, type) {
    return function (scope, element, attrs) {

        scope.config = scope.config || {};
        var ndWrapper = element.find('div')[0], ndParent = element.parent()[0], parentWidth = ndParent.clientWidth, parentHeight = ndParent.clientHeight, width, height, chart;
        var chartEvent = {};
        function getSizes(config) {
            width = config.width || parseInt(attrs.width) || parentWidth || 320;
            height = config.height || parseInt(attrs.height) || parentHeight || 240;
            ndWrapper.style.width = width + 'px';
            ndWrapper.style.height = height + 'px';
        }
        
        function getOptions(dataInput, config, type) {

            var data = _.cloneDeep(dataInput);

            if (data.length == 1) {
                data[0].datapoints = _.sortBy(data[0].datapoints, function(o) { return o.x; });
            }

            if (data.length > 1) {
                var lowerIndex = _.findIndex(data, function(o) { return o.type == 'lower'; });
                if (lowerIndex > 0 ) {
                    var lower = data.splice(lowerIndex,1);
                    data.unshift(lower[0]);
                }
            }
            if (data.length > 1) {
                // merge different xAxis
                var allX = [];
                angular.forEach(data, function (serie) {
                    angular.forEach(serie.datapoints, function (datapoint) {
                        allX.push(datapoint.x);
                    });
                });
                var uniqX = _.uniq(allX);
                angular.forEach(data, function (serie) {
                    var serieX = _.map(serie.datapoints, 'x');
                    for (i=0; i<uniqX.length; i++) {
                        if (!_.includes(serieX, uniqX[i])){
                            serie.datapoints.push({x:uniqX[i], y:undefined});
                        }
                    }
                    serie.datapoints = _.sortBy(serie.datapoints, function(o) { return o.x; });    
                });

                // standarize process
                if (config && config.standardize == true) {
                    for(var i=0; i<data.length; i++) {
                        var allY = []; 
                        var standard = [];
                        _.forEach(data[i].datapoints, function(point) {
                            allY.push(point.y);
                        });
                        var maxY = _.maxBy(allY);
                        var minY = _.minBy(allY);
                        _.map(data[i].datapoints, function (item) {
                            standard.push({x: item.x, y: _.round((item.y-minY)/(maxY-minY),2) });
                        });
                        data[i].datapoints = standard;
                    }
                }
            }

            // merge default config
            config = angular.extend({
                showXAxis: true,
                showYAxis: true,
                showLegend: true
            }, config);
            var xAxis = angular.extend({
                    orient: 'top',
                    axisLine: { show: false },
                    splitLine: {show: true, lineStyle: {width:1, color:"#ddd", opacity:0.5}},
/*                    axisLabel: {
                        //rotate: 10,
                        formatter: function (value, index) {
                            return value.length > 8 ? value.substr(value.length-8,8) : value;
                        }
                    }*/
                }, angular.isObject(config.xAxis) ? config.xAxis : {});
            var yAxis = angular.extend({
                    type: 'value',
                    orient: 'right',
                    //scale: false,
                    scale: type=='line' ? true:false,
                    axisLine: { show: false },
                    splitLine: {show: true, lineStyle: {width:1, color:"#ddd", opacity:0.5}},
                    axisLabel: {
                        formatter: function (v) {
                            return util.formatKMBT(v);
                        }
                    }
                }, angular.isObject(config.yAxis) ? config.yAxis : {});
            // basic config
            var options = {
                    title: util.getTitle(data, config, type),
                    grid: util.getGrid(data, config, type),
                    tooltip: util.getTooltip(data, config, type),
                    legend: util.getLegend(data, config, type),
                    toolbox: angular.extend({ show: false }, angular.isObject(config.toolbox) ? config.toolbox : {}),
                    xAxis: [ angular.extend(xAxis, util.getAxisTicks(data, config, type)) ],
                    yAxis: [ yAxis ],
                    color: util.getColor(data, config, type),
                    geo: util.getGeo(data, config, type),
                    series: util.getSeries(data, config, type, null),
                    backgroundColor: util.getBgColor(data, config, type),
                    dataZoom: util.getZoom(data, config, type),
                    brush: util.getBrush(data, config, type),
                };
            if (!config.showXAxis) {
                angular.forEach(options.xAxis, function (axis) {
                    axis.axisLine = { show: false };
                    axis.axisLabel = { show: false };
                    axis.axisTick = { show: false };
                });
            }
            if (!config.showYAxis) {
                angular.forEach(options.yAxis, function (axis) {
                    axis.axisLine = { show: false };
                    axis.axisLabel = { show: false };
                    axis.axisTick = { show: false };
                });
            }
            if (!config.showLegend || type === 'gauge' || type === 'map') {
                delete options.legend;
            }
            if (!util.isAxisChart(type, data)) {
                delete options.xAxis;
                delete options.yAxis;
            }
            if (config.dataZoom) {
                options.dataZoom = angular.extend({
                    show: true,
                    realtime: true
                }, config.dataZoom);
            }
            if (config.dataRange) {
                options.dataRange = angular.extend({}, config.dataRange);
            }
            if (config.polar) {
                options.polar = config.polar;
            }
            //console.log(options);
            return options;
        }
        var isAjaxInProgress = false;
        var textStyle = {
                color: 'red',
                fontSize: 36,
                fontWeight: 900,
                fontFamily: 'Microsoft Yahei, Arial'
            };
        function setOptions() {
            if (!scope.data || !scope.config) {
                return;
            }
            var options;
            getSizes(scope.config);
            if (!chart) {
                chart = echarts.init(ndWrapper, theme.get(scope.config.theme || 'macarons'));
            }
            if (scope.config.event) {
                if (!Array.isArray(scope.config.event)) {
                    scope.config.event = [scope.config.event];
                }
                if (Array.isArray(scope.config.event)) {
                    scope.config.event.forEach(function (ele) {
                        if (!chartEvent[ele.type]) {
                            chartEvent[ele.type] = true;
                            chart.on(ele.type, function (param) {
                                ele.fn(param);
                            });
                        }
                    });
                }
            } else {
                //apply click event to save curent data into widget;
                //TODO: for TSS bigdata platform only
/*                if (!chartEvent['click']) {
                    chartEvent['click'] = true;
                    chart.on('click', function (param) {
                        var curElement = {name:param.name, value:param.value};
                        var widget = scope.$parent.$parent.vm.widget;
                        widget.curElement = curElement;
                        //alert(angular.toJson(scope.config.curElement));
                    });
                }*/
            }
/*            chart.on('legendselected', function (param) {
                console.log("legendselected");
            });*/

            // string type for data param is assumed to ajax datarequests
            if (angular.isString(scope.data)) {
                if (isAjaxInProgress) {
                    return;
                }
                isAjaxInProgress = true;
                // show loading
/*                chart.showLoading({
                    text: scope.config.loading || '\u594B\u529B\u52A0\u8F7D\u4E2D...',
                    textStyle: textStyle
                });*/
                // fire data request
                $http.get(scope.data).success(function (response) {
                    isAjaxInProgress = false;
                    chart.hideLoading();
                    if (response.data) {
                        options = getOptions(response.data, scope.config, type);
                        if (scope.config.forceClear) {
                            chart.clear();
                        }
                        if (options.series.length) {
                            if (options.geo == null) delete options.geo;
                            chart.setOption(options);
                            chart.resize();
                        } else {
/*                            chart.showLoading({
                                text: scope.config.errorMsg || '\u6CA1\u6709\u6570\u636E',
                                textStyle: textStyle
                            });*/
                        }
                    } else {
/*                        chart.showLoading({
                            text: scope.config.emptyMsg || '\u6570\u636E\u52A0\u8F7D\u5931\u8D25',
                            textStyle: textStyle
                        });*/
                    }
                }).error(function (response) {
                    isAjaxInProgress = false;
/*                    chart.showLoading({
                        text: scope.config.emptyMsg || '\u6570\u636E\u52A0\u8F7D\u5931\u8D25',
                        textStyle: textStyle
                    });*/
                });    // if data is avaliable, render immediately
            } else {
                options = getOptions(scope.data, scope.config, type);
                //if (scope.config.forceClear) {
                    chart.clear();
                //}
                if (options.series.length) {
                    if (options.geo == null) delete options.geo;
                    chart.setOption(options);
                    chart.resize();
                } else {
/*                    chart.showLoading({
                        text: scope.config.errorMsg || '\u6CA1\u6709\u6570\u636E',
                        textStyle: textStyle
                    });*/
                }
            }
            // brush
            if (scope.config.brush) {
                var areas = [];
                _(scope.config.brush).forEach( function (item) {
                    var range = [item.start, item.end];
                    areas.push({xAxisIndex: 0, coordRange: range});
                }); 
/*                chart.dispatchAction({
                    type: 'brush',
                    areas: areas
                });*/
            }
        }
        // update when charts config changes
        scope.$watch(function () {
            return scope.config;
        }, function (value, oldValue) {
            if (value) {
                setOptions();
            //console.log('reset config', value.changing, oldValue.changing);
/*                if(scope.config.changing !== true) {
                    //setOptions();
                    $timeout(function() {
                        setOptions();
                    }, 500);
                }*/
            }
        }, true);
        scope.$watch(function () {
            return scope.data;
        }, function (value, oldValue) {
            if (value) {
            //console.log('reset data', scope.config.changing, scope.config);
/*                if(scope.config.changing !== true) {
                    if (scope.config.maxSize) {
                        setOptions();
                    } else {
                        $timeout(function() {
                            setOptions();
                        }, 500); 
                    }   
                    //setOptions();  
                }*/
                setOptions();
            }
        }, true);


    };
}
/**
 * add directives
 */
var app = angular.module('angular-echarts', ['angular-echarts.theme', 'angular-echarts.util']);
var types = ['scatter', 'bar', 'line', 'area', 'pie', 'donut', 'gauge', 'map', 'radar', 'mix'];
for (var i = 0, n = types.length; i < n; i++) {
    (function (type) {
        app.directive(type + 'Chart', ['$http', '$timeout', 'theme', 'util', function ($http, $timeout, theme, util) {
                    return {
                        restrict: 'EA',
                        template: '<div></div>',
                        scope: {
                            config: '=config',
                            data: '=data'
                        },
                        link: getLinkFunction($http, $timeout, theme, util, type)
                    };
                }]);
    }(types[i]));
}
'use strict';
/**
 * util services
 */
angular.module('angular-echarts.util', []).factory('util', function () {
    function isPieChart(type, data) {
        return ['pie', 'donut'].indexOf(type) > -1 
            || _.includes(_.map(data, 'type'),'pie')
            || _.includes(_.map(data, 'type'),'donut');
    }
    function isMapChart(type) {
        return ['map'].indexOf(type) > -1;
    }
    function isAxisChart(type, data) {
        if (isPieChart(type, data)) {
            return false;
        } else {
            return ['scatter', 'line', 'area', 'upper', 'lower', 'bar', 'stack', 'mix'].indexOf(type) > -1;
        }
    }
    /**
     * get x axis ticks from the 1st serie
     */
    function getAxisTicks(data, config, type) {
        var ticks = [];
        if (data[0]) {
            angular.forEach(data[0].datapoints, function (datapoint) {
                ticks.push(datapoint.x);
                //ticks.push('test');
            });
        }
        return {
            type: 'category',
            //boundaryGap: type === 'bar',
            boundaryGap: type === 'bar' || _.includes(_.map(data, 'type'),'bar'),
             
            //splitNumber: 10,
            data: ticks
        };
    }
    /**
     * get series config
     *
     * @param {Array} data serie data
     * @param {Object} config options
     * @param {String} chart type
     */
    function getSeries(data, config, type, lows) {

        var lowers = lows;
        if (data.length > 1 && lowers == null) {
            lowers = _.find(data, function(o) { return o.type =='lower'; }); 
        }

        //in case of mixed charts
        if (type === 'mix') {
            var mixSeries = [];
            var itemSeries = [];
            var itemData = [];
            angular.forEach(data, function (item) {
                itemData = [item];
                itemSeries = getSeries(itemData, config, item.type, lowers)
                mixSeries.push(itemSeries[0]);
            });
            //console.log(mixSeries);
            return mixSeries;
        }

        var series = [];
        angular.forEach(data, function (serie) {
            // datapoints for line, area, bar chart
            var datapoints = [];
            angular.forEach(serie.datapoints, function (datapoint) {
                if (serie.type === 'scatter') {
                    datapoints.push([datapoint.x,datapoint.y,datapoint.z]);
                } else if (serie.type === 'upper') { 
                    var lower = _.find(lowers.datapoints, function(o) { 
                            return o.x == datapoint.x; }
                        );   
                    datapoints.push(datapoint.y - lower.y);
                } else { 
                    datapoints.push(datapoint.y);
                }
            });
            var conf = {
                    type: type || 'line',
                    legend: {show:true},
                    name: serie.name,
                    data: datapoints,
                    showAllSymbol: false,
                    symbol: 'emptyCircle',
                    showSymbol: false,
                    connectNulls: true,
                    lineStyle: {normal: {
                        width: config.lineWidth || 2,
                        type: serie.lineType || 'solid'
                    }},
                    itemStyle: {normal:{}}
                };
            
            if (type === 'lower') {
                conf.stack = 'confidence-band';
                conf.symbol = 'none';
                conf.type = 'line';
                conf.lineStyle = {
                    normal: {
                        opacity: 0.5,
                        width:1,
                        //type: 'dashed'
                        //type: 'dotted'
                    }
                };
            }

            if (type === 'upper') {
                conf.stack = 'confidence-band';
                conf.symbol = 'none';
                conf.type = 'line';
                conf.lineStyle = {
                    normal: {
                        opacity: 0.5,
                        width:1,
                        //type: 'dashed'
                        //type: 'dotted'
                    }
                };
                conf.areaStyle = {
                    normal: {
                        color: serie.rangeColor || 'rgba(120, 36, 50, 0.3)'
                    }
                };
            }

            if (type === 'bar') {
                var gap = '';
                switch (data.length) {
                    case 1:
                        gap = '50%';
                        break;
                    case 2:
                    case 3:
                        gap = '30%';
                        break;
                    default:
                        gap = '20%'
                }
                conf.barCategoryGap = gap;
                conf.stack = serie.stack;

                //handle single bar color
                var defaultColors = [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ];
                var colors = config.color || defaultColors;
                if (config.singleBarColor) {
                    conf.itemStyle.normal.color = function(params) {
                        return colors[params.dataIndex];
                    };
                } else {
                    if (conf.itemStyle.normal.color) {
                        delete conf.itemStyle.normal.color;
                    } 
                }

            }
            // scatter chart special config
            if (type === 'scatter') {
                conf.type = 'scatter';
                //conf.symbol = 'emptyCircle';
                delete conf.symbol;
                conf.symbolSize = function (point) {
                    //return Math.sqrt(point[1]) / 5e2;
                    return point[2] || 5;
                };
                conf.label = {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.name;
                        },
                        position: 'top'
                    }
                };
                conf.itemStyle = {
                    normal: {
                        shadowBlur: 5,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 2,
                    }
                };
            }
            // area chart is actually line chart with special itemStyle
            if (type === 'area') {
                conf.type = 'line';
                conf.itemStyle = { normal: { areaStyle: { type: 'default' } } };
            }
            // gauge chart need many special config
            if (type === 'gauge') {
                conf = angular.extend(conf, {
                    splitNumber: 10,
                    // 分割段数，默认为5
                    axisLine: {
                        // 坐标轴线
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                            width: 8
                        }
                    },
                    axisTick: {
                        // 坐标轴小标记
                        splitNumber: 10,
                        // 每份split细分多少段
                        length: 12,
                        // 属性length控制线长
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        // 坐标轴文本标签，详见axis.axisLabel
                        textStyle: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto'
                        }
                    },
                    splitLine: {
                        // 分隔线
                        show: true,
                        // 默认显示，属性show控制显示与否
                        length: 30,
                        // 属性length控制线长
                        lineStyle: {
                            // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: { width: 5 },
                    title: {
                        show: true,
                        offsetCenter: [0, '-40%'],
                        // x, y，单位px
                        textStyle: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder'
                        }
                    },
                    detail: {
                        formatter: '{value}%',
                        textStyle: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto',
                            fontWeight: 'bolder'
                        }
                    }
                }, config.gauge || {});
            }

            //add markArea
            if (isAxisChart(type, data) && serie.markRange) {
                conf.markArea = {};
                conf.markArea.slient = true;
                conf.markArea.data = [];
                conf.markArea.data.push([]);
                var areaData = conf.markArea.data[0];
                areaData.push({xAxis:serie.markRange.start});
                areaData.push({xAxis:serie.markRange.end});  
            }

            // datapoints for pie chart and gauges are different
            if (!isAxisChart(type, data)) {
                conf.data = [];
                angular.forEach(serie.datapoints, function (datapoint) {
                    conf.data.push({
                        value: datapoint.y,
                        name: datapoint.x
                    });
                });
            }
            if (isPieChart(type, data)) {
                // donut charts are actually pie charts
                conf.type = 'pie';
                // pie chart need special radius, center config
                conf.center = config.center || ['55%', '50%'];
                conf.radius = config.radius || '65%';

                // donut chart require special itemStyle
                if (type === 'donut') {
                    conf.center = config.center || ['50%', '50%'];
                    conf.radius = config.radius || ['50%', '70%'];
                    conf = angular.extend(conf, {
                        itemStyle: {
                            normal: {
                                label: { 
                                    show: true,
                                    formatter: '{d}%',
                                    //position: 'center',
                                },
                                labelLine: { 
                                    show: true,
                                    length:3,
                                    length2:8
                                }
                            },
/*                            emphasis: {
                                label: {
                                    show: false,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '50',
                                        fontWeight: 'bold'
                                    }
                                }
                            }*/
                        }
                    }, config.donut || {});
                } else if (type === 'pie') {
                    conf.roseType = serie.roseType || false;
                    if (conf.roseType) {
                        conf.radius = ['15%','75%'];
                    } else {
                        delete conf.radius;
                    }
                    conf = angular.extend(conf, {
                        itemStyle: {
                            normal: {
                                label: {
                                    position: 'inner',
/*                                    formatter: function (a, b, c, d) {
                                        return (d - 0).toFixed(0) + '%';
                                    }*/
                                    formatter: '{d}%'
                                },
                                labelLine: { show: false }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: '{b}\n{d}%'
                                }
                            }
                        }

                    }, config.pie || {});
                }
            }
            if (isMapChart(type)) {
                var mapEffect = {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        scale:20,
                        period:5,
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            formatter: '{b}',
                            textStyle: {color:'#000'}
                       }
                    },
                    symbolSize: function(val) {
                        return val[2];
                    },
                    itemStyle: {
                        normal: {
                            //color: '#CC9933',
                            color: '#F6A623',
                            borderWidth: 5
                        }
                    },
                };
                //delete conf.type;
                conf = angular.extend(conf, {}, config.mapEffect || mapEffect);
                conf.data = serie;
            }
            // if stack set to true
            if (config.stack) {
                conf.stack = 'total';
            }
            if (type === 'radar') {
                conf.data = serie.data;
            }
            series.push(conf);
        });
        //if (type != 'mix') {console.log(series);}
        return series;
    }
    /**
     * get legends from data series
     */
    function getLegend(data, config, type) {
        //var legend = { data: [], textStyle:{color: "#999"} };
        var legend = { data: []};
        if (isPieChart(type, data)) {
            if (data[0]) {
                angular.forEach(data[0].datapoints, function (datapoint) {
                    legend.data.push(datapoint.x);
                });
            }
            legend.orient = 'verticle';
            legend.x = 'left';
            legend.y = 'center';
        } else {
            angular.forEach(data, function (serie) {
                legend.data.push(serie.name);
            });
            legend.orient = 'horizontal';
            legend.show = !(data.length == 1 && data[0].type == "bar");
        }
        return angular.extend(legend, config.legend || {});
    }
    /**
     * get tooltip config
     */
    function getTooltip(data, config, type) {
        var tooltip = {};
        var items = config.traces || data;  //TODO: for TSS bigdata platform, data in config.traces
        var itemType;
        if (angular.isArray(items)){
            itemType = items[0].type || type;
        } else {
            itemType = type;
        }
        //switch (type) {
        switch (itemType) {
        case 'line':
        case 'area':
        case 'mix':
            tooltip.trigger = 'axis';
            //tooltip.formatter = '{a} <br/>{b}: {c} ({d}%)';
            break;
        case 'pie':
        case 'donut':
        case 'bar':
        //case 'mix':
        case 'map':
        case 'gauge':
            tooltip.trigger = 'item';
            break;
        }
        if (itemType === 'pie' || itemType === 'donut') {
            if (config.customTooltip) {
                tooltip.formatter = function (params, ticket, callback) {
                    return params.data.tooltip;
                }
            } else {
                //tooltip.formatter = '{a} <br/>{b}: {c} ({d}%)';
                tooltip.formatter = '{b}<br/> {c} ({d}%)';
            }
        }
        if (itemType === 'map') {
            if (config.tooltip) {
                tooltip.formatter = config.tooltip.formatter || '{b}';
            } else {
                tooltip.formatter = '{b}';
            }
        }
        var upperIndex = _.findIndex(data, function(o) {return o.type=='upper'});    
        if (upperIndex > 0) {
            tooltip.formatter = function (params, ticket, callback) {
                var strTip = params[0].name + "<br/>";
                
                for(var i=0; i<data.length;i++) {
                    var value = (upperIndex==i) ? parseFloat(params[i].value) + parseFloat(params[0].value) : params[i].value;
                    strTip += "<font size='4' color='" + params[i].color + "''>●</font>&nbsp;" + params[i].seriesName + ": " + value + "<br/>";
                }
                return strTip;
            };
        }


        return angular.extend(tooltip, angular.isObject(config.tooltip) ? config.tooltip : {});
    }
    function getTitle(data, config, type) {
        if (angular.isObject(config.title)) {
            return config.title;
        }
        return isPieChart(type, data) ? null : {
            text: config.title,
            subtext: config.subtitle || '',
            x: 50
        };
    }
    function getBrush(data, config, type) {
        if (angular.isObject(config.brush)) {
            var brushObj = {
                brushType: 'lineX',
                xAxisIndex: 'all',
                transformable: false,
                outOfBrush: {colorAlpha: 1}
            }
            return brushObj;
        }
    }
    function getGrid(data, config, type) {
        if (angular.isObject(config.grid)) {
            return config.grid;
        } else {
            //return {};
            return {show:false, left:50, top:40, right:40, bottom:40};
        }
    }
    function getColor(data, config, type) {
        if (angular.isArray(config.color)) {
            return config.color;
        } else {
            return ['#d48265', '#91c7ae', '#ca8622', '#749f83', '#6e7074', '#bda29a', '#546570', '#c4ccd3'];
        }
    }
    function getGeo(data, config, type) {
        if (angular.isObject(config.geo)) {
            return config.geo;
        } else {
            return null;
        }
    }
    function getBgColor(data, config, type) {
        if (config.bgColor) {
            return config.bgColor;
        } else {
            return 'transparent';
            //return "rgba(128, 128, 128, 0.1)";
        }
    }
    function getZoom(data, config, type) {
        var zooms = [];
        if (config.zoomX == true) {
            zooms.push({type:'slider', show:true}); 
            zooms[0].xAxisIndex = 0;
        }
        if (config.zoomY == true) {
            zooms.push({type:'slider', show:true}); 
            zooms[1].yAxisIndex = 0;
        }
        return zooms;
    }
    function formatKMBT(y, formatter) {
        if (!formatter) {
            formatter = function (v) {
                return Math.round(v * 100) / 100;
            };
        }
        y = Math.abs(y);
        if (y >= 1000000000000) {
            return formatter(y / 1000000000000) + 'T';
        } else if (y >= 1000000000) {
            return formatter(y / 1000000000) + 'B';
        } else if (y >= 1000000) {
            return formatter(y / 1000000) + 'M';
        } else if (y >= 1000) {
            return formatter(y / 1000) + 'K';
        } else if (y < 1 && y > 0) {
            return formatter(y);
        } else if (y === 0) {
            return '';
        } else {
            return formatter(y);
        }
    }
    return {
        isPieChart: isPieChart,
        isAxisChart: isAxisChart,
        getAxisTicks: getAxisTicks,
        getColor: getColor,
        getGeo: getGeo,
        getBgColor: getBgColor,
        getZoom: getZoom,
        getSeries: getSeries,
        getLegend: getLegend,
        getTooltip: getTooltip,
        getTitle: getTitle,
        getBrush: getBrush,
        getGrid: getGrid,
        formatKMBT: formatKMBT
    };
});
'use strict';
/**
 * theme services
 * posible themes: infographic macarons shine dark blue green red gray default
 */
angular.module('angular-echarts.theme', []).factory('theme', ['infographic', 'macarons', 'shine', 'dark', 'blue', 'green', 'red', function (infographic, macarons, shine, dark, blue, green, red, grey) {
    var themes = {
        infographic: infographic,
        macarons: macarons,
        shine: shine,
        dark: dark,
        blue: blue,
        green: green,
        red: red,
        grey: grey,
    };

    return {
        get: function (name) {
            return themes[name] ? themes[name] : {};
        },
    };

}]);
'use strict';
/**
 * blue theme
 */
angular.module('angular-echarts.theme').factory('blue', function () {
    return {
        // 默认色板
        color: [
                    '#1790cf','#1bb2d8','#99d2dd','#88b0bb',
                    '#1c7099','#038cc4','#75abd0','#afd6dd'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#1790cf'
            }
        },
        // 值域
        dataRange: { color: ['#1178ad','#72bbd0'] },
        // 工具箱
        toolbox: { color: ['#1790cf','#1790cf','#1790cf','#1790cf'] },
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#1790cf',
                    type: 'dashed'
                },
                crossStyle: { color: '#1790cf' },
                shadowStyle: {
                    // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#eee',
            // 数据背景颜色
            fillerColor: 'rgba(144,197,237,0.2)',
            // 填充颜色
            handleColor: '#1790cf'    // 手柄颜色
        },
        grid: { borderWidth: 1 },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#1790cf'
                }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#1790cf'
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        timeline: {
            lineStyle: { color: '#1790cf' },
            controlStyle: {
                normal: { color: '#1790cf' },
                emphasis: { color: '#1790cf' }
            }
        },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#1bb2d8',
                    // 阳线填充颜色
                    color0: '#99d2dd',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#1c7099',
                        // 阳线边框颜色
                        color0: '#88b0bb'    // 阴线边框颜色
                    }
                }
            }
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#c12e34' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#99d2dd' },
                    label: { textStyle: { color: '#c12e34' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#1790cf' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },
        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#1bb2d8'],[0.8, '#1790cf'],[1, '#1c7099']],
                    width: 8
                }
            },
            axisTick: {
                // 坐标轴小标记
                splitNumber: 10,
                // 每份split细分多少段
                length: 12,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {
                // 分隔线
                length: 18,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                color: 'auto'
            },
            title: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});
'use strict';
/**
 * dark theme
 */
angular.module('angular-echarts.theme').factory('dark', function () {
    return {
        // 全图默认背景
        backgroundColor: '#1b1b1b',
        // 默认色板
        color: [
                    '#FE8463','#9BCA63','#FAD860','#60C0DD','#0084C6',
                    '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
                    '#B5C334'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#fff'    // 主标题文字颜色
            }
        },
        // 图例
        legend: {
            itemGap: 8,
            textStyle: {
                color: '#000000'    // 图例文字颜色
            }
        },
        // 值域
        dataRange: {
            itemWidth: 15,
            color: ['#FFF808','#21BCF9'],
            textStyle: {
                color: '#ccc'    // 值域文字颜色
            }
        },
        toolbox: {
            color: ['#fff', '#fff', '#fff', '#fff'],
            effectiveColor: '#FE8463',
            disableColor: '#666',
            itemGap: 8
        },
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(250,250,250,0.8)',
            // 提示背景颜色，默认为透明度为0.7的黑色
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#aaa'
                },
                crossStyle: { color: '#aaa' },
                shadowStyle: {
                    // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.2)'
                }
            },
            textStyle: { color: '#333' }
        },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#555',
            // 数据背景颜色
            fillerColor: 'rgba(200,200,200,0.2)',
            // 填充颜色
            handleColor: '#eee'    // 手柄颜色
        },
        // 网格
        grid: { borderWidth: 1 },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                show: false
            },
            axisTick: {
                // 坐标轴小标记
                show: false
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#ccc'
                }
            },
            splitLine: {
                // 分隔线
                show: false
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                show: false
            },
            axisTick: {
                // 坐标轴小标记
                show: false
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#ccc'
                }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#aaa'],
                    type: 'dashed'
                }
            },
            splitArea: {
                // 分隔区域
                show: false
            }
        },
        polar: {
            name: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#ccc'
                }
            },
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#ddd'
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)'] }
            },
            splitLine: { lineStyle: { color: '#ddd' } }
        },
        timeline: {
            label: { textStyle: { color: '#ccc' } },
            lineStyle: { color: '#aaa' },
            controlStyle: {
                normal: { color: '#fff' },
                emphasis: { color: '#FE8463' }
            },
            symbolSize: 3
        },
        // 折线图默认参数
        line: { smooth: false },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#FE8463',
                    // 阳线填充颜色
                    color0: '#9BCA63',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#FE8463',
                        // 阳线边框颜色
                        color0: '#9BCA63'    // 阴线边框颜色
                    }
                }
            }
        },
        // 雷达图默认参数
        radar: {
            symbol: 'emptyCircle',
            // 图形类型
            symbolSize: 3    //symbol: null,         // 拐点图形类型
                 //symbolRotate: null,  // 图形旋转控制
        },
        pie: {
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                },
                emphasis: {
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 1)'
                }
            }
        },
        map: {
            itemStyle: {
                normal: {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#ccc' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#FE8463' },
                    label: { textStyle: { color: 'ccc' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#fff' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(228, 228, 228, 0.2)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(228, 228, 228, 0.2)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(228, 228, 228, 0.9)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(228, 228, 228, 0.9)'
                        }
                    }
                }
            }
        },
        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#9BCA63'],[0.8, '#60C0DD'],[1, '#D7504B']],
                    width: 3,
                    shadowColor: '#fff',
                    //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {
                // 坐标轴小标记
                length: 15,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff',
                    //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {
                // 坐标轴小标记
                textStyle: {
                    // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor: '#fff',
                    //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {
                // 分隔线
                length: 25,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 1,
                    color: '#fff',
                    shadowColor: '#fff',
                    //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {
                // 分隔线
                shadowColor: '#fff',
                //默认透明
                shadowBlur: 5
            },
            title: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor: '#fff',
                    //默认透明
                    shadowBlur: 10
                }
            },
            detail: {
                shadowColor: '#fff',
                //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],
                // x, y，单位px
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            }
        },
        funnel: {
            itemStyle: {
                normal: {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 1
                },
                emphasis: {
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});
'use strict';
/**
 * green theme
 */
angular.module('angular-echarts.theme').factory('green', function () {
    return {
        // 默认色板
        color: [
                    '#408829','#68a54a','#a9cba2','#86b379',
                    '#397b29','#8abb6f','#759c6a','#bfd3b7'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#408829'
            }
        },
        // 值域
        dataRange: { color: ['#1f610a','#97b58d'] },
        // 工具箱
        toolbox: { color: ['#408829','#408829','#408829','#408829'] },
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#408829',
                    type: 'dashed'
                },
                crossStyle: { color: '#408829' },
                shadowStyle: {
                    // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#eee',
            // 数据背景颜色
            fillerColor: 'rgba(64,136,41,0.2)',
            // 填充颜色
            handleColor: '#408829'    // 手柄颜色
        },
        grid: { borderWidth: 1 },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#408829'
                }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#408829'
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        timeline: {
            lineStyle: { color: '#408829' },
            controlStyle: {
                normal: { color: '#408829' },
                emphasis: { color: '#408829' }
            }
        },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#68a54a',
                    // 阳线填充颜色
                    color0: '#a9cba2',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#408829',
                        // 阳线边框颜色
                        color0: '#86b379'    // 阴线边框颜色
                    }
                }
            }
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#c12e34' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#99d2dd' },
                    label: { textStyle: { color: '#c12e34' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#408829' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },
        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#86b379'],[0.8, '#68a54a'],[1, '#408829']],
                    width: 8
                }
            },
            axisTick: {
                // 坐标轴小标记
                splitNumber: 10,
                // 每份split细分多少段
                length: 12,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {
                // 分隔线
                length: 18,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                color: 'auto'
            },
            title: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});
'use strict';
/**
 * infographic theme
 */
angular.module('angular-echarts.theme').factory('infographic', function () {
    return {
        // 默认色板
        color: [
                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#27727B'    // 主标题文字颜色
            }
        },
        // 图例
        legend: { itemGap: 8 },
        // 值域
        dataRange: {
            x: 'right',
            y: 'center',
            itemWidth: 5,
            itemHeight: 25,
            color: ['#C1232B','#FCCE10']
        },
        toolbox: {
            color: [
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                        ],
            effectiveColor: '#ff4500',
            itemGap: 8
        },
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.5)',
            // 提示背景颜色，默认为透明度为0.7的黑色
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#27727B',
                    type: 'dashed'
                },
                crossStyle: { color: '#27727B' },
                shadowStyle: {
                    // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: 'rgba(181,195,52,0.3)',
            // 数据背景颜色
            fillerColor: 'rgba(181,195,52,0.2)',
            // 填充颜色
            handleColor: '#27727B'
        },
        // 网格
        grid: { borderWidth: 1 },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#27727B'
                }
            },
            splitLine: {
                // 分隔线
                show: false
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                show: false
            },
            splitArea: { show: false },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#ccc'],
                    type: 'dashed'
                }
            }
        },
        polar: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#ddd'
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)'] }
            },
            splitLine: { lineStyle: { color: '#ddd' } }
        },
        timeline: {
            lineStyle: { color: '#27727B' },
            controlStyle: {
                normal: { color: '#27727B' },
                emphasis: { color: '#27727B' }
            },
            symbol: 'emptyCircle',
            symbolSize: 3
        },
        // 柱形图默认参数
        bar: {
            itemStyle: {
                normal: { borderRadius: 0 },
                emphasis: { borderRadius: 0 }
            }
        },
        // 折线图默认参数
        line: {
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#fff',
                    lineStyle: { width: 1 }
                },
                emphasis: { borderWidth: 0 }
            },
            symbol: 'circle',
            // 拐点图形类型
            symbolSize: 3.5    // 拐点图形大小
        },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#C1232B',
                    // 阳线填充颜色
                    color0: '#B5C334',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#C1232B',
                        // 阳线边框颜色
                        color0: '#B5C334'    // 阴线边框颜色
                    }
                }
            }
        },
        // 散点图默认参数
        scatter: {
            itemdStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: 'rgba(200,200,200,0.5)'
                },
                emphasis: { borderWidth: 1 }
            },
            symbol: 'star4',
            // 图形类型
            symbolSize: 4    // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        },
        // 雷达图默认参数
        radar: {
            symbol: 'emptyCircle',
            // 图形类型
            symbolSize: 3    //symbol: null,         // 拐点图形类型
                 //symbolRotate: null,  // 图形旋转控制
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#C1232B' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#fe994e' },
                    label: { textStyle: { color: 'rgb(100,0,0)' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#27727B' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },
        gauge: {
            center: ['50%','80%'],
            radius: '100%',
            startAngle: 180,
            endAngle: 0,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#B5C334'],[0.8, '#27727B'],[1, '#C1232B']],
                    width: '40%'
                }
            },
            axisTick: {
                // 坐标轴小标记
                splitNumber: 2,
                // 每份split细分多少段
                length: 5,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#fff'
                }
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#fff',
                    fontWeight: 'bolder'
                }
            },
            splitLine: {
                // 分隔线
                length: '5%',
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#fff'
                }
            },
            pointer: {
                width: '40%',
                length: '80%',
                color: '#fff'
            },
            title: {
                offsetCenter: [0, -20],
                // x, y，单位px
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontSize: 20
                }
            },
            detail: {
                offsetCenter: [0, 0],
                // x, y，单位px
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontSize: 40
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});
'use strict';
/**
 * macarons theme
 */
angular.module('angular-echarts.theme').factory('macarons', function () {
    return {
        // 默认色板
        color: [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#008acd'    // 主标题文字颜色
            }
        },
        // 图例
        legend: { itemGap: 8 },
        // 值域
        dataRange: {
            itemWidth: 15,
            //color:['#1e90ff','#afeeee']
            color: ['#2ec7c9','#b6a2de']
        },
        toolbox: {
            color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
            effectiveColor: '#ff4500',
            itemGap: 8
        },
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.5)',
            // 提示背景颜色，默认为透明度为0.7的黑色
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#008acd',
                    type: 'dashed',
                    width: 1
                },
                crossStyle: {
                    color: '#008acd',
                    width: 1
                },
                shadowStyle: {
                    // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.2)'
                }
            }
        },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#efefff',
            // 数据背景颜色
            fillerColor: 'rgba(182,162,222,0.2)',
            // 填充颜色
            handleColor: '#008acd'    // 手柄颜色
        },
        // 网格
        grid: { borderColor: '#eee' },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#008acd',
                    width: 1
                }
            },
            axisLabel: {
                // label
                skipFirst: true,
                margin: 3,
                textStyle: { color: '#999999' }
            },
            axisTick: {
                // 坐标轴线
                show: true,
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#008acd',
                    width: 1
                }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#008acd',
                    width: 1
                }
            },
            axisLabel: {
                // label
                skipFirst: true,
                margin: 3,
                textStyle: { color: '#999999' }
            },
            axisTick: {
                // 坐标轴线
                show: false,
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#008acd',
                    width: 1
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        polar: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#ddd'
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)'] }
            },
            splitLine: { lineStyle: { color: '#ddd' } }
        },
        timeline: {
            lineStyle: { color: '#008acd' },
            controlStyle: {
                normal: { color: '#008acd' },
                emphasis: { color: '#008acd' }
            },
            symbol: 'emptyCircle',
            symbolSize: 3
        },
        // 柱形图默认参数
        bar: {
            itemStyle: {
                normal: { borderRadius: 5 },
                emphasis: { borderRadius: 5 }
            }
        },
        // 折线图默认参数
        line: {
            smooth: true,
            symbol: 'circle',
            // 拐点图形类型
            symbolSize: 5    // 拐点图形大小
        },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#d87a80',
                    // 阳线填充颜色
                    color0: '#2ec7c9',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#d87a80',
                        // 阳线边框颜色
                        color0: '#2ec7c9'    // 阴线边框颜色
                    }
                }
            }
        },
        // 散点图默认参数
        scatter: {
            symbol: 'circle',
            // 图形类型
            symbolSize: 4    // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        },
        // 雷达图默认参数
        radar: {
            symbol: 'emptyCircle',
            // 图形类型
            symbolSize: 3    //symbol: null,         // 拐点图形类型
                 //symbolRotate: null,  // 图形旋转控制
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#d87a80' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#fe994e' },
                    label: { textStyle: { color: 'rgb(100,0,0)' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#1e90ff' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },
        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
                    width: 10
                }
            },
            axisTick: {
                // 坐标轴小标记
                splitNumber: 20,
                // 每份split细分多少段
                length: 15,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {
                // 分隔线
                length: 22,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width: 5,
                color: 'auto'
            },
            title: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});
'use strict';
/**
 * red theme
 */
angular.module('angular-echarts.theme').factory('red', function () {
    return {
        // 默认色板
        color: [
                    '#d8361b','#f16b4c','#f7b4a9','#d26666',
                    '#99311c','#c42703','#d07e75'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#d8361b'
            }
        },
        // 值域
        dataRange: { color: ['#bd0707','#ffd2d2'] },
        // 工具箱
        toolbox: { color: ['#d8361b','#d8361b','#d8361b','#d8361b'] },
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#d8361b',
                    type: 'dashed'
                },
                crossStyle: { color: '#d8361b' },
                shadowStyle: {
                    // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#eee',
            // 数据背景颜色
            fillerColor: 'rgba(216,54,27,0.2)',
            // 填充颜色
            handleColor: '#d8361b'    // 手柄颜色
        },
        grid: { borderWidth: 1 },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#d8361b'
                }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: '#d8361b'
                }
            },
            splitArea: {
                show: true,
                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
            },
            splitLine: {
                // 分隔线
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },
        timeline: {
            lineStyle: { color: '#d8361b' },
            controlStyle: {
                normal: { color: '#d8361b' },
                emphasis: { color: '#d8361b' }
            }
        },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#f16b4c',
                    // 阳线填充颜色
                    color0: '#f7b4a9',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#d8361b',
                        // 阳线边框颜色
                        color0: '#d26666'    // 阴线边框颜色
                    }
                }
            }
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#c12e34' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#99d2dd' },
                    label: { textStyle: { color: '#c12e34' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#d8361b' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },
        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#f16b4c'],[0.8, '#d8361b'],[1, '#99311c']],
                    width: 8
                }
            },
            axisTick: {
                // 坐标轴小标记
                splitNumber: 10,
                // 每份split细分多少段
                length: 12,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {
                // 分隔线
                length: 18,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                color: 'auto'
            },
            title: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});
'use strict';
/**
 * shine theme
 */
angular.module('angular-echarts.theme').factory('shine', function () {
    return {
        // 默认色板
        color: [
                    '#c12e34','#e6b600','#0098d9','#2b821d',
                    '#005eaa','#339ca8','#cda819','#32a487'
                ],
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: { fontWeight: 'normal' }
        },
        // 图例
        legend: { itemGap: 8 },
        // 值域
        dataRange: {
            itemWidth: 15,
            // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
            color: ['#1790cf','#a2d4e6']
        },
        // 工具箱
        toolbox: {
            color: ['#06467c','#00613c','#872d2f','#c47630'],
            itemGap: 8
        },
        // 提示框
        tooltip: { backgroundColor: 'rgba(0,0,0,0.6)' },
        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#dedede',
            // 数据背景颜色
            fillerColor: 'rgba(154,217,247,0.2)',
            // 填充颜色
            handleColor: '#005eaa'    // 手柄颜色
        },
        grid: { borderWidth: 1 },
        // 类目轴
        categoryAxis: {
            axisLine: {
                // 坐标轴线
                show: false
            },
            axisTick: {
                // 坐标轴小标记
                show: false
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {
                // 坐标轴线
                show: false
            },
            axisTick: {
                // 坐标轴小标记
                show: false
            },
            splitArea: {
                // 分隔区域
                show: true,
                // 默认不显示，属性show控制显示与否
                areaStyle: {
                    // 属性areaStyle（详见areaStyle）控制区域样式
                    color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
                }
            }
        },
        timeline: {
            lineStyle: { color: '#005eaa' },
            controlStyle: {
                normal: { color: '#005eaa' },
                emphasis: { color: '#005eaa' }
            }
        },
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#c12e34',
                    // 阳线填充颜色
                    color0: '#2b821d',
                    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#c12e34',
                        // 阳线边框颜色
                        color0: '#2b821d'    // 阴线边框颜色
                    }
                }
            }
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: { color: '#ddd' },
                    label: { textStyle: { color: '#c12e34' } }
                },
                emphasis: {
                    // 也是选中样式
                    areaStyle: { color: '#e6b600' },
                    label: { textStyle: { color: '#c12e34' } }
                }
            }
        },
        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#005eaa' } } } },
        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },
        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                // 坐标轴线
                show: true,
                // 默认显示，属性show控制显示与否
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
                    width: 5
                }
            },
            axisTick: {
                // 坐标轴小标记
                splitNumber: 10,
                // 每份split细分多少段
                length: 8,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {
                // 分隔线
                length: 12,
                // 属性length控制线长
                lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                width: 3,
                color: 'auto'
            },
            title: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },
        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
    };
});})();
var eCharts = angular.module('eCharts', []);  

eCharts.directive('eLine', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div style="height:400px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) { 
			$scope.$watch('item', function(value) {
			if (typeof (value) != "undefined") {
            var option = {  
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    show: true,  
                    trigger: 'item'  
                },  
                // 图例  
                legend: {  
                    data: $scope.legend  
                },  
                // 表格  
                grid: {  
                    left: 30,
                    right: 30,
                    top: 50,
                    bottom: 50,
                },
                // 横轴坐标轴  
                xAxis: [{  
                    type: 'category',  
                    data: $scope.item  
                }],  
                // 纵轴坐标轴  
                yAxis: [{  
                    type: 'value'  
                }],  
                // 数据内容数组  
                series: function(){  
                    var serie=[];  
                    for(var i=0;i<$scope.legend.length;i++){  
                        var item = {  
                            name : $scope.legend[i],  
                            type: 'line',
                            //areaStyle: {normal: {}},
                            data: $scope.data[i]  
                        };  
                        serie.push(item);  
                    }  
                    return serie;  
                }()  
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option);  
			}});
        }  
    };  
}); 

eCharts.directive('eBar', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div style="height:400px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {
			$scope.$watch('item', function(value) {
			if (typeof (value) != "undefined") {
            var option = {  
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    show: true,  
                    trigger: 'item'  
                },  
                // 图例  
                legend: {  
                    data: $scope.legend  
                },
                // 表格  
                grid: {  
                    left: 30,
                    right: 30,
                    top: 50,
                    bottom: 50,
                },
                // 横轴坐标轴  
                xAxis: [{  
                    type: 'category',  
                    data: $scope.item  
                }],  
                // 纵轴坐标轴  
                yAxis: [{  
                    type: 'value'  
                }],  
                // 数据内容数组  
                series: function(){  
                    var serie=[];  
                    for(var i=0;i<$scope.legend.length;i++){  
                        var item = {  
                            name : $scope.legend[i],  
                            type: 'bar',  
                            data: $scope.data[i]  
                        };  
                        serie.push(item);  
                    }  
                    return serie;  
                }()  
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option); 
			}});
        }  
    };  
}); 


eCharts.directive('eScatter', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div style="height:400px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {  
            var option = {  
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    show: true,  
                    trigger: 'item'  
                },  
                // 图例  
                legend: {  
                    data: $scope.legend  
                },  
                // 横轴坐标轴  
                xAxis: [{  
                    type: 'category',  
                    data: $scope.item  
                }],  
                // 纵轴坐标轴  
                yAxis: [{  
                    type: 'value'  
                }],  
                // 数据内容数组  
                series: function(){  
                    var serie=[];  
                    for(var i=0;i<$scope.legend.length;i++){  
                        var item = {  
                            name : $scope.legend[i],  
                            type: 'scatter',  
                            data: $scope.data[i]  
                        };  
                        serie.push(item);  
                    }  
                    return serie;  
                }()  
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option);  
        }  
    };  
}); 

eCharts.directive('eMap', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div style="height:600px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {  
            var option = {  
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    data:['iphone5']
                },
                dataRange: {
                    min: 0,
                    max: 1000,
                    x: 'left',
                    y: 'bottom',
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series : [
                {
                    name: 'iphone5',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data: $scope.data
                        
                    }
                ]
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option);  
        }  
    };  
}); 

eCharts.directive('ePie', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div style="height:400px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {  
            var option = {  
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    show: true,  
                    trigger: 'item'  
                },  
                // 图例  
                legend: {  
                    data: $scope.legend  
                },  
                // 数据内容数组  
                series:  [
                {
                    name:'City',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:$scope.data
                }]
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option);  
        }  
    };  
}); 

eCharts.directive('eRadar', function() {  
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div style="height:400px;"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {  
            var option = {  
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    show: true,  
                    trigger: 'item'  
                },  
                // 图例  
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y : 'bottom',
                    data:$scope.legend
                },
                polar : [
                    {indicator : [
                        { text: '销售（sales）', max: 6000},
                        { text: '管理（Administration）', max: 16000},
                        { text: '信息技术（Information Techology）', max: 30000},
                        { text: '客服（Customer Support）', max: 38000},
                        { text: '研发（Development）', max: 52000},
                        { text: '市场（Marketing）', max: 25000}
                    ]}
                ],
                calculable : true,
                series : [
                {
                    type: 'radar',
                    data : $scope.data
                }]
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option);  
        }  
    };  
}); 
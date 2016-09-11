/**
 * Created by KroketTian on 2016/9/2.
 */

var cluster;
var markers = [];
var catMarkersList = [];
DistrictMarker = [];
function markersFather(){
    this.prototype = true;
}
markersFather.prototype = {
    // createMarkersByData:function(data){
    //     if(data){
    //         for(var i=0;i<data.length;i++){
    //                 var mapmarker = new AMap.Marker({
    //                     position:[data[i].lng,data[i].lat],
    //                     content:data[i].content
    //                 })
    //                 markers.push(this.marker);
    //         }
    //     }
    // },
    setMarkersIntoMap : function(mapObj){
        // console.log(mapObj);
        mapObj.add(this.markers);
        mapObj.setFitView(this.markers);
    },
    returnMarkers : function(){
      return this.markers;
    }
}
//继承方法
function inherit(subClass, superClass) {
    function F() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass.constructor;
}
inherit(catMarkers, markersFather);
inherit(districtMarkers, markersFather);
function catMarkers(){
    markersFather.call(this);
    this.markers = [];
    this.createCatMarkersByData = function(data){
        for(var i = 0; i < data.data.length; i++){
            var content = "<div class='catmarker'>" +
                "<img src='" + data.data[i].PICURL +"'alt='猫图片'/>" +
                "<div class =  'catmarkerP'>" +
                "<p>猫猫：" + data.data[i].NAME + "</p>" +
                "<p>主人：" + data.data[i].cathost + "</p>" +
                "</div>";
            var marker = new AMap.Marker({
                position:[data.data[i].LONGITUDE,data.data[i].LATITUDE],
                content:content,
                extData:{
                    picUrl:data.data[i].PICURL,
                    adcode:data.data[i].adcode
                }
            })
            this.markers.push(marker);
            markers.push(marker);
            catMarkersList.push(marker);
        }
        // console.log(markers);
    }
}
function districtMarkers(){
    markersFather.call(this);
    this.markers = [];
    this.countryMarkers = [];
    this.provinceMarkers = [];
    this.cityMarkers = [];
    this.district = [];
    this.createMarkersByData = function(data){
        for(var i = 0 ; i < data.length ; i++){
            var districtContent = '';
            if(data[i].level == "country"){
                for(var picI = 0 ; picI < 9 ; picI++){
                    districtContent += "<img class='districtCatImg' src="+catMarkersList[picI].G.extData.picUrl+"  alt='meo'/>";
                }
            }else if(data[i].level == "province"){
                var adcode = data[i].adcode.substring(0,2);
                var markersListI = 0;
                for(var picI=0; picI < 9 && markersListI<catMarkersList.length ;){
                    if(catMarkersList[markersListI].G.extData.adcode.substring(0,2) == adcode){
                        districtContent += "<img class='districtCatImg' src="+catMarkersList[markersListI].G.extData.picUrl+"  alt='meo'/>";
                        picI++;
                    }
                    markersListI++;
                }
            }else if(data[i].level == "city"){
                var adcode = data[i].adcode.substring(0,4);
                var markersListI = 0;
                for(var picI=0; picI < 9 && markersListI<catMarkersList.length ;){
                    if(catMarkersList[markersListI].G.extData.adcode.substring(0,4) == adcode){
                        districtContent += "<img class='districtCatImg' src="+catMarkersList[markersListI].G.extData.picUrl+"  alt='meo'/>";
                        picI++;
                    }
                    markersListI++;
                }
            }else if(data[i].level == "district" ){
                var adcode = data[i].adcode;
                var markersListI = 0;
                for(var picI=0; picI < 9 && markersListI<catMarkersList.length ;){
                    if(catMarkersList[markersListI].G.extData.adcode == adcode){
                        districtContent += "<img class='districtCatImg' src="+catMarkersList[markersListI].G.extData.picUrl+"  alt='meo'/>";
                        picI++;
                    }
                    markersListI++;
                }
            }
            if(districtContent != ""){
                var content = "<div class='districtmarker'>" +
                    "<div class='districtTitle'>" + data[i].level + "</div>" +
                    "<div class='districtContent'>" + districtContent +
                    "</div>" +
                    "<div class='districtFoot'>" + "展开" + "</div>"
                "</div>";
                var marker = new AMap.Marker({
                    position:[data[i].center.lng,data[i].center.lat],
                    content:content
                })
                this.markers.push(marker);
            }
            if(data[i].districtList){
                this.createMarkersByData(data[i].districtList);
            }
        }
        console.log(this.markers);
    }
}
// 添加点聚合
function addCluster(tag,mapObj,markers) {
    if (cluster) {
        cluster.setMap(null);
    }
    if (tag == 1) {
        var sts = [{
            url: "bscat/img/clusterIcon.jpg",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -30),
            textColor:'#fff'
        }];
        mapObj.plugin(["AMap.MarkerClusterer"], function() {
            cluster = new AMap.MarkerClusterer(mapObj, markers, {
                styles: sts
            });
            var clusterMarkers = cluster.getGridSize();
            // console.log(clusterMarkers);
        });
    } else {
        map.plugin(["AMap.MarkerClusterer"], function() {
            cluster = new AMap.MarkerClusterer(map, markers);
        });
    }
}
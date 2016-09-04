/**
 * Created by KroketTian on 2016/9/2.
 */

var cluster;
var markers = [];
var catMarkers = [];
function catmarker(option){
    var me = this;
    this.markerType = option.markerType;
    this.lng = option.lng;
    this.lat = option.lat;
    this.content = "<div class='catmarker'>" +
        "<img src='" + option.content.imgurl +"'alt='猫图片'/>" +
        "<div class =  'catmarkerP'>" +
        "<p>猫猫：" + option.content.catname + "</p>" +
        "<p>主人：" + option.content.cathost + "</p>" +
        "</div>";
    // this.icon = null;
    this.mapmarker = null;

    this.create = function(){
        me.mapmarker = new AMap.Marker({
            position:[me.lng,me.lat],
            content:me.content,
            // icon:me.icon
        })
        markers.push(me.mapmarker);
        catMarkers.push(me.mapmarker);

        // me.mapmarker.setMap(mapObj);
    };
    this.setIntoMap = function(mapObj){
        if(me.mapmarker){
            me.mapmarker.setMap(mapObj);
        }
    };
}
// 添加点聚合
function addCluster(tag,mapObj,markers) {
    if (cluster) {
        cluster.setMap(null);
    }
    if (tag == 1) {
        var sts = [{
            url: "",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -30),
            // textColor:'transparent'
        }];
        mapObj.plugin(["AMap.MarkerClusterer"], function() {
            cluster = new AMap.MarkerClusterer(mapObj, markers, {
                styles: sts
            });
        });
    } else {
        map.plugin(["AMap.MarkerClusterer"], function() {
            cluster = new AMap.MarkerClusterer(map, markers);
        });
    }
}
/**
 * Created by kroketTian on 2016/9/2.
 */
function map(){
    this.map = null;

    var me = this;

    this.createmap = function(container){
        me.map = new AMap.Map(container,{
            resizeENable: true,
            zoom:10
        })
    }
    this.addMarkerByajax = function(url,data,type){
        $.ajax({
            url:url,
            data:data,
            type: "POST",
            dataType: "JSON",
            async: false,
            success:function(data){
                console.log(data.data);
                if(data.data){
                    if(type === "catmarker") {
                        var catMarkersObj = new catMarkers();
                        catMarkersObj.createCatMarkersByData(data);
                        catMarkersObj.setMarkersIntoMap(me.map);
                    }
                }
            }
        })
    }
    this.addDistrictMerkers = function(){
        AMap.service('AMap.DistrictSearch',function(){
            var districtSearch = new AMap.DistrictSearch({
                level : 'country',
                subdistrict : 3
            });
            districtSearch.search('中国',function(status,result){
                console.log(result);
                var districtMarkersObj = new districtMarkers();
                districtMarkersObj.createMarkersByData(result.districtList);
                districtMarkersObj.setMarkersIntoMap(me.map);
            })
        })
    }
    this.addCluster = function(tag,markers){
        addCluster(tag,me.map,markers);
    }
    this.findCityAdcode = function(){
        AMap.service('AMap.DistrictSearch',function(){
            var districtSearch = new AMap.DistrictSearch({
                level : 'country',
                subdistrict : 3
            });
            districtSearch.search('中国',function(status,result){
                console.log(result);
            })
        })
    }
}
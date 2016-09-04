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
    this.addMarkerByajax = function(url,data){
        $.ajax({
            url:url,
            data:data,
            type: "POST",
            dataType: "JSON",
            async: false,
            success:function(data){
                console.log(data.data);
                if(data.data){
                    if(data.type === "catmarker") {
                        for (var i = 0; i < data.data.length; i++) {
                            var marker = new catmarker({
                                markerType: data.data[i].type,
                                lng: data.data[i].LONGITUDE,
                                lat: data.data[i].LATITUDE,
                                content: {
                                    imgurl: data.data[i].PICURL,
                                    catname: data.data[i].NAME,
                                    cathost: data.data[i].cathost
                                }
                            });
                            marker.create();
                            marker.setIntoMap(me.map);
                            me.map.setCenter(marker.mapmarker.getPosition());
                        }
                    }
                    addCluster(1,me.map,markers);
                }
            }
        })
    }
}
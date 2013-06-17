$(document).ready(function() {
	UI.init();
});

var UI = {

	init: function() {

        /**
        * Collate browser details
        */
        $(window).on("resize", function() {
            UI.site.width = document.documentElement.clientWidth;
            UI.getSiteMode();
        });
        UI.getSiteMode();

        /**
        * Click functionality to deal with small screen nav
        */
		$(".js-toggle-menu").bind("click", function(e) {
            var menu = $(".js-header__nav");

            if(menu.attr("data-showing")) {
                /* Hide Menu */
                UI.hideMenu(menu);
            } else {
                /* Show Menu */
                UI.showMenu(menu);
            }

			return false;
		});

        $(".js-close-menu").bind("click", function(e){
            var menu = $(".js-header__nav");
            UI.hideMenu(menu);
            return false;
        });

        /**
        * Tile mouseover functionality
        */
        $(".js-tile-hover").bind("mouseover", function(e) {
            var overlay = $(this), 
                tile = overlay.parents(".tile");

            overlay.animate({ height: "100%" }, function() {
                tile.find(".tile__content").show();
            });

            tile.bind("click", function(event) {
                event.stopPropagation();
                
                return false;
            });
        });

        $(".js-tile-hover").bind("mouseleave", function(e) {
            var overlay = $(this), 
                tile = overlay.parents(".tile");

            overlay.animate({ height: "4.5em", minHeight: "4.5em" }, function(){
                tile.find(".tile__content").hide();
            });
        });

        /**
        * Click handler for main nav
        */
        $(".header__link").bind("mouseover", function() {
            var link = $(this), 
                name = link.attr("data-name"), 
                div = $(".dropdown[data-name='" + name + "']");

            $(".header__link").removeClass("active");
            link.addClass("active");

            $(".dropdown").hide();
            div.slideToggle();
            return false;
        });

        $(".dropdown").bind("mouseleave", function() {
            var links = $(".header__link");
            links.removeClass("active");
            $(".dropdown").slideUp();
            return false;
        });

        $(".js-carousel__control").bind("click", function() {

            var li = $(this), 
                next_panel = li.attr("data-panel-name");

            $(".js-carousel__control").removeClass("carousel__thumbnail--active");
            li.addClass("carousel__thumbnail--active");

            $(".panel").fadeOut(function() {
                $(".panel[data-panel-name='" + next_panel + "']").fadeIn();
            });

            return false;
        });
		
	}, 

    showMenu: function(menu){
        var container = $(".container"), 
            menu_width = (container.width() / 100) * 40;
        
        menu.attr("data-showing", true).show();
        container.animate({ marginLeft: "-90%"});

    }, 

    hideMenu: function(menu){
        var container = $(".container"), 
            menu_width = (container.width() / 100) * 40;

        menu.removeAttr("data-showing").hide();
        container.animate({ width: "100%", marginLeft: "0"});

    }, 

	"site": {
		"width": document.documentElement.clientWidth, 
        "height": $(".container").height(), 
		"breakpoints": [
			{ "name": "medium", "min": 615 }, 
			{ "name": "small", "min": 0 }
		], 
		"mode": {}
	}, 

    getSiteMode: function() {
        for(var i=0, len=UI.site.breakpoints.length; i<len; i++) {
            var breakpoint = UI.site.breakpoints[i];
            if(document.documentElement.clientWidth > breakpoint.min) {
                UI.site.mode = breakpoint.name;
                break;
            }
        }
    }, 

    setupMenu: function() {
        if(UI.site.mode == "small") {
            $(".header__nav").height(UI.site.height);
        }
    }

};
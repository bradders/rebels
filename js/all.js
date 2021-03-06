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
            UI.triggerChange(UI.site.width);
        });
        UI.triggerChange(UI.site.width);


        /**
        * Click functionality to deal with mobile screen nav
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
        if(!UI.isMobile()) {

            $(".js-tile-hover").bind("mouseover", function(e) {
                var tile = $(this), 
                    image = $(this).find(".tile__image"), 
                    overlay = $(this).find(".tile__overlay");

                image.stop().animate({ marginTop: "-90px" }, 300);
                overlay.stop().animate({ height: "200px" }, 300);
                tile.find(".tile__content").show();
                
                tile.bind("click", function(event) {
                    event.stopPropagation();
                    
                    return false;
                });
                
            });

            $(".js-tile-hover").bind("mouseleave", function(e) {
                var tile = $(this), 
                    image = $(this).find(".tile__image"), 
                    overlay = tile.find(".tile__overlay");

                image.stop().animate({ marginTop: "0" }, 300);
                overlay.stop().animate({ height: "100px", minHeight: "110px" });
                tile.find(".tile__content").hide();
            });

        }


        /**
        * Event handler for main nav
        */        
        if(!UI.isMobile()) {

            $(".header__link").bind("mouseover", function() {
                var link = $(this), 
                    name = link.attr("data-name"), 
                    div = $(".dropdown[data-name='" + name + "']");

                $(".header__link").removeClass("active");
                link.addClass("active");

                if(div.length > 0) {
                    $(".dropdown").hide();
                    $(".extra-nav").fadeIn();
                    div.toggle();
                } else {
                    setTimeout(function(){
                        $(".extra-nav").fadeOut();
                    }, 300);
                }
                return false;
            });

            $(".site-header").bind("mouseleave", function() {
                //$(".extra-nav").slideUp();
                return false;
            });

        }


        /**
        * News Item Hover
        */
        if(!UI.isMobile()) {

            $(".js-item-hover").bind("mouseover", function(e) {

                var parent = $(this), 
                    link = parent.find("a").first(), 
                    icons = parent.find(".news-item__info");

                link.stop().animate({ marginTop: "-30px" }, 300);
                icons.stop().animate({ marginTop: "-30px" }, 300);

            });
            
            $(".js-item-hover").bind("mouseleave", function(e) {

                var parent = $(this), 
                    link = parent.find("a").first(), 
                    icons = parent.find(".news-item__info");

                link.stop().animate({ marginTop: "0" }, 300);
                icons.stop().animate({ marginTop: "0" }, 300);

            });

        }

        /**
        * Match Info Hover
        */
        if(!UI.isMobile()) {

            $(".matches li").bind("mouseover", function(e) {
                var panel = $(this).find(".match__info");
                panel.show();
            });

            $(".matches li").bind("mouseleave", function(e) {
                var panel = $(this).find(".match__info");
                panel.hide();
            });
        }

        /**
        * Expand Match Report
        */
        $(".js-expand-report").bind("click", function() {
            $(".match__content p").show();
            $(this).hide();
            return false;
        });

        /**
        * Show Filter Options
        */
        $(".js-sort-by").bind("click", function() {
            var link = $(this), 
                parent = $(this).parent();

            parent.find(".filter__options").toggle();
            link.toggleClass("sort-by--active");
            return false;
        });


        /**
        * Carousel
        */
        $(".carousel").each(function() {
            $(this).find(".panel").first().show();
        });

        $(".js-carousel__control").bind("click", function() {

            var li = $(this), 
                carousel = li.parents(".carousel"), 
                controls = carousel.find(".js-carousel__control"), 
                allPanels = carousel.find(".panel"), 
                nextPanel = li.attr("data-panel-name"), 
                currentPanel = carousel.find(".panel[data-panel-current='true']");

            controls.removeClass("carousel__thumbnail--active");
            li.addClass("carousel__thumbnail--active");

            currentPanel.removeAttr("data-panel-current");
            currentPanel.fadeOut(function() {
                carousel.find(".panel[data-panel-name='" + nextPanel + "']").fadeIn().attr("data-panel-current", "true");
            });

            return false;
        });


        /**
        * Click handler for load more buttons
        */
        $(".load-more").bind("click", function() {

            var link = $(this), 
            default_link_text = link.text();

            link.html("Loading");

            link.removeClass("load-more--plus").addClass("load-more--loading");
            $.ajax({
                url: "./?json",
                success: function(data) {
                    //
                }, 
                error: function(a, b, c) {
                    //
                }, 
                complete: function() {
                    setTimeout(function() {
                        link.removeClass("load-more--loading").addClass("load-more--plus");
                        link.html(default_link_text);
                    }, 2000);
                }
            });

            return false;
        });
		
	}, 

    resetDesktop: function() {

        $(".js-header__nav").show();
        $(".container").attr("style", "");

    }, 

    resetTablet: function() {
        
        $(".js-header__nav").show();
        $(".container").attr("style", "");

    }, 

    resetMobile: function() {

        /**
        * Remove hover effect for news items
        */
        $(".js-item-hover").unbind();

        /**
        * Remove hover effect for tiles
        */
        $(".js-tile-hover").unbind();

    }, 

    showMenu: function(menu){
        var container = $(".container"), 
            menu_width = (container.width() / 100) * 40;
        
        menu.attr("data-showing", true).show();
        container.stop().animate({ marginLeft: "-90%"});

    }, 

    hideMenu: function(menu){
        var container = $(".container"), 
            menu_width = (container.width() / 100) * 40;

        menu.removeAttr("data-showing").hide();
        container.stop().animate({ width: "100%", marginLeft: "0"});

    }, 

	"site": {
		"width": document.documentElement.clientWidth, 
        "height": $(".container").height(), 
		"breakpoints": [
			{ "name": "desktop", "min": 1020 }, 
            { "name": "tablet", "min": 770 }, 
			{ "name": "mobile", "min": 0 }
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

    triggerChange: function(screenWidth) {
        var previousSiteMode = UI.site.mode;
        UI.getSiteMode();
        if(UI.site.mode != previousSiteMode) {
            
            switch(UI.site.mode) {
                case "desktop":
                    UI.resetDesktop();
                    break;
                case "tablet":
                    UI.resetTablet();
                    break;
                case "mobile":
                    UI.resetMobile();
                    break;
            }

        }

    }, 

    isDesktop: function() {
        return (UI.site.mode == "desktop") ? true : false;
    }, 

    isTablet: function() {
        return (UI.site.mode == "tablet") ? true : false;
    }, 

    isMobile: function() {
        return (UI.site.mode == "mobile") ? true : false;
    }

};
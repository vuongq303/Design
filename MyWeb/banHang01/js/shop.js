'use strict';

var nhShop = {
	wrapElement: null,
	init: function(){
		var self = this;

		self.wrapElement = $('[nh-shops]');
		if (self.wrapElement.length == 0) return false;

		self.initLibrary();
		self.event();
	},
	initLibrary: function(){
		var self = this;

		nhMain.location.init({
			idWrap: ['[nh-shops]']
		});
	},
	event: function(){
		var self = this;

		$(document).on('change', '#city_id', function(e) {
			self.loadListShop();
		});

		$(document).on('change', '#district_id', function(e) {
			self.loadListShop();
		});

		self.wrapElement.on('click', '.item:not(".active")', function(e) {
			self.wrapElement.find('.item').removeClass('active');
			$(this).addClass('active');

			self.loadGmap();
		});
	},
	loadListShop: function(){
		var self = this;
		
		var city_id = $('#city_id').val();
		var district_id = $('#district_id').val();

		var wrapShops = self.wrapElement.find('.list');
		if (wrapShops.length == 0) return false;

		nhMain.callAjax({
			url: '/shop/get-list',
			data: {
				city_id: city_id,
				district_id: district_id,
			},
			dataType: _HTML,
		}).done(function(response) {
		   	wrapShops.html(response);
		   	self.loadGmap();
		});
	},
	loadGmap: function(){
		var self = this;

		var shopActive = self.wrapElement.find('.list .item.active');
		var wrapIframeGmap = self.wrapElement.find('.map-info');

		if (shopActive.length == 0 || wrapIframeGmap.length == 0) return false;

		var address =  shopActive.attr('data-address');
		var gmap =  shopActive.attr('data-gmap');

		if (typeof(address) != _UNDEFINED && address != null && address != ''
			&& (typeof(gmap) == _UNDEFINED || gmap == null || gmap == '') ) {
			wrapIframeGmap.html('<iframe src="https://maps.google.com/maps?hl=en&q='+ address +'&t=p&z=14&ie=UTF8&iwloc=B&output=embed" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">');
		}

		if (typeof(gmap) != _UNDEFINED && gmap != null && gmap != '') {
			wrapIframeGmap.html(gmap);
		}
	}
}

nhShop.init();
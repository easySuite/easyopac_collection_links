/**
 * Checks if there is a preview for materials before activating the preview
 * button.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.easyopac_collection_links = {
    attach: function (context) {
      var previewedIds = [];
      var selector = '.button-preview';
      $(selector, context).once('button-preview', function () {
        previewedIds.push($(this).data("preview-id"));
      });

      if (previewedIds.length) {
        $.ajax({
          dataType: 'json',
          type: 'POST',
          url: '/previews',
          data: {
            previewedIds: previewedIds
          },
          success: function (result) {
            $.each(result, function (previewedId, previewLink) {
              if (previewLink.data.url) {
                var title = Drupal.t('Preview snippet');

                switch (previewLink.data.type) {
                  case 'ebook':
                    title = Drupal.t('Preview ebook');
                    break;
                  case 'audiobook':
                    title = Drupal.t('Preview audiobook');
                    break;
                  case 'videos':
                    title = Drupal.t('Preview videos');
                    break;
                }

                $(selector + '[data-preview-id="' + previewedId + '"]', context)
                  .attr('href', previewLink.data.url)
                  .removeClass('previewable-pending')
                  .addClass('previewable')
                  .html(title);

                var videoId = new RegExp('[\\?&]v=([^&#]*)').exec(previewLink.data.url);
                if (videoId !== null) {
                  $(selector + '[data-preview-id="' + previewedId + '"]', context).colorbox({
                    iframe: true,
                    innerWidth: "80%",
                    innerHeight: "80%",
                    href: function () {
                      if (videoId && videoId[1]) {
                        return 'http://youtube.com/embed/' + videoId[1] + '?rel=0&wmode=transparent';
                      }
                    }
                  });
                }

                // Add some styling for collection items.
                $('.collections-preview--collection-wrapper').find('.previewable').parent().css('border-top', '1px solid #c6c6c6');
              }
            });
          }
        });
      }
    }
  };

})(jQuery);

/**
 * Checks if there is a preview for materials before activating the preview
 * button.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.easyopac_collection_links = {
    attach: function (context) {
      let previewedIds = [];
      let selector = '.button-preview';
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
            $.each(result, function (previewedId, previewLinks) {
              $.each(previewLinks, function (previewType, previewLink) {
                if (previewLink) {
                  $(selector + '[data-preview-id="' + previewedId + '"][data-preview-type="' + previewType + '"]', context)
                    .attr('href', previewLink)
                    .removeClass('previewable-pending')
                    .addClass('previewable');

                  // Add some styling for collection items.
                  $('.collections-preview--collection-wrapper').find('.previewable').parent().css('border-top', '1px solid #c6c6c6');
                }
              });
            });
          }
        });
      }
    }
  };
})(jQuery);

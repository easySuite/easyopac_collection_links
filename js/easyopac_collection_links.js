/**
 * @file
 * Checks for a materials preview before activating the preview button.
 */

(function ($) {
  "use strict";

  $(document).ready(function () {
    let previewedIds = [];
    let selector = '.button-preview';

    $(selector).each(function () {
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
                let btnTitle = Drupal.t('Preview');
                if (previewType === 'ebook') {
                  btnTitle = Drupal.t('Preview ebook');
                }
                if (previewType === 'audiobook') {
                  btnTitle = Drupal.t('Preview audiobook');
                }

                $(selector + '[data-preview-id="' + previewedId + '"]')
                  .attr('href', previewLink)
                  .removeClass('previewable-pending')
                  .addClass('previewable')
                  .html(btnTitle);

                // Add some styling for collection items.
                $('.collections-preview--collection-wrapper').find('.previewable').parent().css('border-top', '1px solid #c6c6c6');
              }
            });
          });
        }
      });
    }
  });
})(jQuery);

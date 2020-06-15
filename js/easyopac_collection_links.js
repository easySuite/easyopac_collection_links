/**
 * @file
 * Checks for a materials preview before activating the preview button.
 */

(function ($) {
  "use strict";

  $(document).ready(function () {
    let previewedIds = [];
    let mobile = false;
    let selector = '.button-preview';

    if ($('body').hasClass('has-touch')) {
      mobile = true;
    }

    $(selector).each(function () {
      previewedIds.push($(this).data("preview-id"));
    });

    if (previewedIds.length) {
      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: '/previews',
        data: {
          previewedIds: previewedIds,
          pageType: Drupal.settings.easyopac_collection_links.page_type,
        },
        success: function (result) {
          $.each(result, function (previewedId, previewLinks) {
            $.each(previewLinks, function (previewType, previewLink) {
              if (previewLink) {
                let cbHeight = '95%';
                let btnTitle = Drupal.t('Preview');
                let inlineStyle = {
                  overflow: 'overflow: hidden;',
                  width: "width: 100%;"
                };

                if (previewType === 'ebook') {
                  btnTitle = Drupal.t('Preview ebook');
                  inlineStyle.height = "height: 95%;";
                }
                if (previewType === 'audiobook') {
                  btnTitle = Drupal.t('Preview audiobook');
                  inlineStyle.height = "height: 400px;";
                  cbHeight = '350px';
                }

                let styles = Object.keys(inlineStyle).map(function (key) {
                  return inlineStyle[key];
                }).join(' ');

                let btn = $(selector + '[data-preview-id="' + previewedId + '"][data-preview-type="' + previewType + '"]')
                  .attr('href', previewLink)
                  .removeClass('previewable-pending')
                  .addClass('previewable')
                  .html(btnTitle);

                if (mobile === false) {
                  btn.colorbox({
                    height: cbHeight,
                    width: '1140px',
                    scrolling: false,
                    html: "<iframe src='/ecl-proxy?url=" + previewLink + "' style='" + styles + "'></iframe>",
                  });
                }
                else {
                  btn.attr('target', '_blank');
                }

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

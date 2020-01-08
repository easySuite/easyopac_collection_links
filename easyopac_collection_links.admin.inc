<?php

/**
 * @file
 */

/**
 * easyDDB collections previews custom settings form.
 */
function easyopac_collection_links_settings_form($form, &$form_state) {
  $form['easyopac_collection_links_lms_service_url'] = [
    '#type' => 'textfield',
    '#title' => t('LMS Service URL'),
    '#description' => t('URL to LMS service with consumer attached. No trailing slash.'),
    '#default_value' => variable_get('easyopac_collection_links_lms_service_url', null),
  ];

  return system_settings_form($form);
}

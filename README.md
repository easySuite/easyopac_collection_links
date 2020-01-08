# easyOPAC collection links
On a collection there can be multiple material types. For the type "Ebog" there is a Preview link on the
final item link. This module adds a "Preview" button as an action button to collection in easyOPAC, which opens
the actual preview.

### Installation
1. Go to `@/admin/modules` and enable `easyOPAC collection links` module.

### Configuration
1. Go to `admin/config/collection-links` page and configure URL to LMS service with consumer attached.

    Example: _`https://v3.lms.inlead.ws/{consumer}`_

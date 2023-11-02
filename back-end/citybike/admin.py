from django.conf import settings
from django.utils.translation import gettext_lazy


def get_site_header_and_title():
    return f"Citybike Admin ({settings.DEPLOYMENT_NAME})"


def configure_admin_site(admin_site):
    admin_site.site_title = gettext_lazy(get_site_header_and_title())
    admin_site.site_header = gettext_lazy(get_site_header_and_title())

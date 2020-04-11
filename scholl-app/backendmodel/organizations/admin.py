from django.contrib import admin

from .models import (
    BerkasLKN,
    BarangBukti,
    StatusBarangBukti,
    Penangkapan,
    ProsesPengadilan,
    ProsesTersangka,
    Tersangka,
    StatusTersangka,

)


admin.site.register(BerkasLKN)
admin.site.register(Penangkapan)
admin.site.register(Tersangka)
admin.site.register(ProsesTersangka)
admin.site.register(ProsesPengadilan)
admin.site.register(StatusTersangka)
admin.site.register(BarangBukti)
admin.site.register(StatusBarangBukti)

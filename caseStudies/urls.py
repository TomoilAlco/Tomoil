from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name='case_studies'

urlpatterns = [
    path('case-studies/', views.case_studies_view, name='case_studies'),
    path('case-study/<int:pk>/', views.case_study_detail, name='case_study_detail'),
]

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,
                      document_root=settings.STATIC_ROOT)

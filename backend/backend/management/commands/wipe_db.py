from django.apps import apps
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Wipes all data from the database"

    def handle(self, *args, **kwargs):
        # Optionally, prompt to confirm
        confirm = input("Are you sure you want to wipe the database? (yes/no): ")
        if confirm.lower() != 'yes':
            self.stdout.write(self.style.ERROR("Operation cancelled."))
            return

        # Wipe all tables
        try:
            models = apps.get_models()  # Get all models from all installed apps
            for model in models:
                if hasattr(model, 'objects'):
                    model.objects.all().delete()
                    self.stdout.write(self.style.SUCCESS(f"Successfully wiped all data from {model.__name__} model"))
            self.stdout.write(self.style.SUCCESS("Successfully wiped all data from all models"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {e}"))
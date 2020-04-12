from app.index import create_app
import os


app = create_app()
PORT = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=PORT)

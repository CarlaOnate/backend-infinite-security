# Infinite Security

- Recomendamos ver el video ya que se explicar a detalle la funcionalidad actual de la aplicación
Explciacion poyecto web: https://drive.google.com/drive/folders/1HMrMYtW7E6jmSzVUbklvNxIJLFkpqheA?usp=sharing

# Instalación app 
### Setup del back del proyecto
**Clonar repositorio y accesar proyecto**
Clonar el repositorio en la computadora usando `git clone <url del repositorio>`
- En la terminal o el command prompt ingresar al folder llamado backend. `cd Pagina-web/backend`
---
**Activar ambiente virtaul en back**
*Instrucciones para mac o linux*
- Revisar que este instalado pip (revisar esta guía) https://www.geeksforgeeks.org/how-to-install-pip-in-macos/
  Esto es importante para poder instalar los paquetes que necesita django para funcionar.
- Revisar si se tiene virtualenv instalado `virtualenv --version`
  - En caso de que no: Instalar virtualenv -> (Revisar paso 1) https://www.dev2qa.com/how-to-install-python-django-in-virtual-environment/
  Al igual esto se usa para instalar los paquetes dentro de un am biente virtual, este ambiente ya viene en el repo.
- Iniciar ambiente virtual `source django_env/bin/activate`
- Instalar paquetes necesarios con: `pip install -r requirements.txt`
- Descargar y agregar el archivo db.sqlite3 que se subio en canvas, esta es una DB de prueba que ya tiene usuarios creados. Esto es importante ya que tiene los superusers creados, los cuales pueden accesar la Base de Datos.
- Correr django con: `python manage.py runserver`

**Todos los pasos anteriroes se tienen que hacer dentro de la carpeta de backend, para revisar esto usa `ls` en la terminar y debes de ver el archivo de manage.py en la carpeta en la que estes**

---
### Setup de front
- Abrir nueva terminal
- Ingresar a la carpeta de frontend `cd frontend` - o escribir todo el path usando tab para que la terminal autocomplete las opciones hacia donde ir.
- Revisar que este instalado npm: `npm --version`
 - En caso de que no:
  - Instalar nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
  - Instalar node: `nvm install node`
  - Revisar la instalacion de npm: `npm -v` o `npm --version`
- Correr: `npm i`
- Correr: `npm start`

LISTO! Una pantalla en el navegador se debería abrir con la aplicación corriendo

## Uso de Django Admin para modificar DB
*El backend de django tiene que estar correindo para poder acceder al sitio admin de Django*
Para entrar al sitio de administrador de django ir a esta liga: http://127.0.0.1:8000/admin/
- Usuario admin 1: admin@admin.com
- Usuario admin 2: admin2@admin.com
Contraseña: Se agrego como comentario en los comentarios de la entrega en canvas.

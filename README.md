# Infinite Security

# Instalación app web
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

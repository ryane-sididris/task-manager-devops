


* Avoir **Minikube** et **kubectl** installés.
* 
Lancer docker 

## Ouvrir un 1er terminal :

etre a la racine de devops_ops-main

`kubectl apply -f k8s/`

`kubectl get pods -w`

et attendre que tout affiche running, quand c'est bon faire ctrl+c

`minikube service frontend`

Ceci ouvrira votre navigateur sur le port 30001.

## Ouvrir un 2eme terminal :

etre a la radcine du projet :

`kubectl port-forward service/backend 3000:3000`

rafraichir la page

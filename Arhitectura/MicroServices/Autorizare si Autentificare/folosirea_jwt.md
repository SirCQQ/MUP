# Music Party Chooser.Arhitectura.
## Autentificare si autorizare
Intr-o aplicatie monolitica,intreaga aplicatie este un singur proces cu posibilitatea de acces la toate bazele de date necesare.

Datorita arhitecturii bazata pe microservicii ce va fi folosita pentru aplicatia dezvoltata,autorizarea si autentificarea userilor este mai dificila deoarece va trebui realizata in fiecare microserviciu fara incalcarea principiului de "single responsibility", ce spune ca nu fiecare microserviciu ar trebui sa implementeze procedura de autentificare/autorizare.

Din aceasta cauza, utilizarea autorizarii prin intermediul sesiunilor ( ce sunt stocate pe server, fiind trimis un session id clientului ) nu este viabila datorita aparitiei necesitatii de a share-ui aceste sesiuni intre microservicii,fie printr-un mecanism de sincronizare a sesiunilor sau o stocare centralizata a sesiunilor.

Avand in vedere aceste aspecte am decis sa folosim tehnologia JSON Web Tokens(JWT) pentru autentificare/autorizare.Aceasta metoda va stoca informatiile userului la nivel de client,intr-o modalitate criptata.

Serviciul de User authentication/authorization va genera la cererea userului(la logare) un Token ce contine: un header, un payload si o signatura. Folosind signatura ce contine un secret generat de acest microserviu responsabil, token-ul va fi hashuit. Acest token (numit JSON Web Token) va fi folosit pentru autorizare in toate microserviciile. 

Pentru a permite aceasta metoda de autorizare,microserviciile trebuie sa aiba o metode de validare a JWT ului si de sharuire a secretului generat de serviciul user authentication/authorization (o cheie secreta cunoscuta de toate microserviciile) .
 	

<b>Header</b>:
{
&nbsp;&nbsp;&nbsp;"typ": "JWT",  
&nbsp;&nbsp;&nbsp;"alg": "HS256"
}

<b>Payload</b>:
{
&nbsp;&nbsp;&nbsp;"user_id":
&nbsp;&nbsp;&nbsp;"username":
&nbsp;&nbsp;&nbsp;"exp":
}

<b>Signature</b>:
HMACSHA256(  
  &nbsp;&nbsp;&nbsp;base64UrlEncode(header) + "." +  
 &nbsp;&nbsp;&nbsp; base64UrlEncode(payload),  
 &nbsp;&nbsp;&nbsp; secret  
)

How <b>JWT</b> works:
![JWT diagram](https://cdn-images-1.medium.com/max/1600/0*4e6oPp1HYrmDm2CH.png)

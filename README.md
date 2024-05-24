# IISSI-2 IS: Simulacro de examen de laboratorio

## Enunciado

Realice las modificaciones que considere necesarias, tanto en backend como en frontend, para satisfacer los
nuevos requisitos que a continuación se describen.
Se desea permitir a los dueños de restaurantes crear sus propias categorías de restaurantes. Para ello, en la
pantalla de creación de restaurantes se incluirá un botón para acceder a una nueva pantalla que permitirá
introducir un nuevo nombre de categoría de restaurante (ver capturas). Puede usar este icono para el botón:

<MaterialCommunityIcons name='folder-plus-outline' color={'white'} size={20} />

Al volver a la pantalla de creación de restaurantes tras introducir la nueva categoría, dicha categoría debe
estar disponible en la lista desplegable de categorías de restaurantes.
No se debe permitir la creación de una categoría que ya existiera. En dicho caso, el Backend debe responder
con un error que será visualizado en la pantalla de creación de categorías de restaurantes al pulsar el botón
de submit. 
Además, el tamaño máximo para los nombres de las categorías de restaurante será de 50
caracteres. Esta restricción debe comprobarse tanto a nivel de formulario en el Frontend como a nivel de
Backend.


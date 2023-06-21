@echo off
set work_dir=D:\GOPATH\src\github.com\KoLLlaka\__HTML\toxin\src\img\catalog
for /d %%B in (%work_dir%\*) do (
(ren %%B\*.jpg 01.jpg) && (for %%C in (02,03,04) do copy /Y /B %%B\01.jpg %%B\%%C.jpg))
set work_dir=

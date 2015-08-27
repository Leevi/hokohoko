# Kia ora, Hokohokoahau
## Hush 
> **Hush** is a <a href="https://nodejs.org/">Node.js</a> app which can compute hash values for a batch of data.
### **config.json** - static configuration of the app.
> **algorithm** could be 'sha1', 'md5', 'sha256', 'sha512'.
>
> **key** is a string used as salt data.
>
> **input** is the input file path and name.
>
> **output** is the output file path and name.
>
> **encoding** is used for both read input file and write output file.
>
> **column** is the number of first column to compute hash.
>
> **count** is the amount of column(s) to compute hash.
>
### **input.txt** - an example input file has 3 field each row.
> The input file should be a *simple* comma-separated-values file. *Simple* means that no escape logic is supported.
>
### **output.txt** - an example output file generated from **input.text**.
> The output file will include the original fields plus new fields of hash value.
>
### **hush.js** - the main app
> **Usage:** node hush [[input-file] output-file]
>
> Both *input-file* and *output-file* are optional and their default values are defined in config.json

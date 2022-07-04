# Installation
## 1.install JDK and set environment variable
## 2.download and uncompress neo4j Community Server https://neo4j.com/download-center/#community
## 3.cmd open neo4j folder/bin, use "neo4j.bat console" start neo4j server
## 4.open website ..7474,initial acount and password are neo4j, first time need to reset your own password

# Run python file to build KG graph one by one
write_neo4j.py -> wikipedia_scraper.py -> links_count.py -> updateNeo4j.py -> get_links_article.py -> normalization.py ->embeddings.py
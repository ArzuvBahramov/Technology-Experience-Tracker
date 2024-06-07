import pandas as pd
import numpy as np
from collections import defaultdict
from datetime import datetime
import math

# Define the periods and technologies
periods = [
    ("08.2015", "10.2017"),
    ("10.2017", "08.2018"),
    ("08.2018", "05.2019"),
    ("05.2019", "05.2020"),
    ("05.2020", "03.2021"),
    ("01.2021", "03.2022"),
    ("03.2022", "06.2024")
]
technologies = [
    {"Java", "Groovy", "Gradle", "Spring(Boot, Data, Security, Cloud)", "gRPC", "REST", "Flyway", "Feign", "Hibernate", "JWT", "Consul", "Traefik", "Kafka", "PostgreSQL", "Redis", "RabbitMQ", "Swagger", "JFrog Artifactory", "Docker", "Docker Compose", "Mapstruct", "Protobuf", "Mockito", "JUnit", "Git", "GitLab", "Jenkins", "Eclipse", "Jira", "Confluence"},
    {"Java", "Kotlin", "Spring (Boot, Data, Security, WebFlux)", "JWT", "REST", "WebSocket", "Gradle", "MongoDB", "PostgreSQL", "Netty", "Docker", "Docker Compose", "Docker Swarm", "Swagger", "Liquibase", "Kafka", "Kafka Streams", "Kafka AVRO", "ELK", "OAuth2", "BitBucket", "BitBucket pipelines", "JFrog Artifactory", "IntelliJ Idea", "Jira", "Confluence"},
    {"Java", "Groovy", "Gradle", "Spring(Boot, Data, Security, Cloud)", "gRPC", "REST", "Flyway", "Feign", "Hibernate", "JWT", "Consul", "Traefik", "Kafka", "PostgreSQL", "Redis", "RabbitMQ", "Swagger", "JFrog Artifactory", "Docker", "Docker Compose", "Mapstruct", "Protobuf", "Mockito", "JUnit", "Git", "GitLab", "Jenkins", "Eclipse", "Jira", "Confluence"},
    {"Java", "Kotlin", "Kafka", "Kafka AVRO", "Spring(Boot)", "Maven", "Git", "GitLab", "GitLab CI/CD", "Oracle", "PostgreSQL", "MySQL", "Snowflake", "DWH", "IntelliJ Idea", "Jira", "Confluence"},
    {"Java", "Spring(Boot, Cloud, WebFlux)", "Netty", "Liquibase", "MySQL", "Couchbase", "Aerospike", "Neo4j", "Membase", "Redis", "Kafka", "Docker", "Docker Compose", "Kubernetes", "Tomcat", "RxJava", "Reactor", "Prometheus", "Grafana", "ELK", "Maven", "Git", "GitLab", "GitLab CI/CD", "IntelliJ Idea", "Jira", "Confluence"},
    {"Java", "Spring(Boot)", "Maven", "Kafka", "Hibernate", "PostgreSQL", "MySQL", "Elasticsearch", "Camunda", "Zeebe", "JFrog Artifactory", "Git", "Bitbucket", "Lens", "SonarQube", "Snyk", "Docker", "Docker-Compose", "Kubernetes", "Helm", "Azure(AKS, Monitor, VNet, Backup, DevOps)", "IntelliJ Idea", "Jira", "Confluence"},
    {"Java", "Spring (Boot, Data)", "Hibernate", "PostgreSQL", "Solr", "Git", "GitLab", "GitLab CI/CD", "Maven", "Docker", "Docker Compose", "Swagger", "Eclipse", "Jira", "Confluence"}
]

# Initialize a dictionary to store technology experiences
tech_experience = defaultdict(lambda: {"experience": 0, "last_used": datetime.min})

# Convert periods to datetime objects and compute experience in years
for period, tech_set in zip(periods, technologies):
    start_date = datetime.strptime(period[0], "%m.%Y")
    end_date = datetime.strptime(period[1], "%m.%Y")
    experience_years = (end_date - start_date).days / 365.25
    for tech in tech_set:
        tech_lower = tech.lower()  # Convert technology name to lowercase for case-insensitive matching
        tech_experience[tech_lower]["experience"] += experience_years
        if end_date > tech_experience[tech_lower]["last_used"]:
            tech_experience[tech_lower]["last_used"] = end_date

# Define the groups and their technologies, all in lowercase for case-insensitive matching
groups = {
    "Programming languages": ["java", "kotlin", "groovy"],
    "Back-end": [
        "spring(boot, cloud, data, security, webflux)", "consul", "oauth2", "feign", 
        "websocket", "rest", "grpc", "protobuf", "jwt", "rxjava", "reactor", "solr", 
        "hibernate", "elk", "liquibase", "flyway", "mapstruct", "swagger", "junit", 
        "mockito", "prometheus", "grafana", "gradle", "maven"
    ],
    "Database management system": [
        "postgresql", "mysql", "mongodb", "redis", "oracle", "snowflake", "dwh", 
        "couchbase", "aerospike", "neo4j", "membase", "elasticsearch"
    ],
    "Message Brokers": ["apache kafka", "kafka streams", "kafka avro", "rabbitmq"],
    "DevOps": [
        "docker", "docker-compose", "docker swarm", "lens", "kubernetes", "helm", 
        "jfrog artifactory", "jenkins", "bitbucket pipelines", "gitlab ci/cd", "sonarqube", "snyk"
    ],
    "Cloud": ["azure(aks, monitor, vnet, backup, devops)"],
    "Application servers": ["apache tomcat", "netty"],
    "Process Orchestrator": ["camunda", "zeebe"],
    "Source control systems": ["git", "bitbucket", "gitlab"],
    "Project management tools": ["jira", "confluence"],
    "IDE": ["intellij idea", "eclipse"]
}

# Initialize a dictionary to store grouped data
grouped_data = {group: [] for group in groups}

# Function to round experience
def round_experience(exp):
    return math.ceil(exp) if exp >= 0.8 else math.floor(exp)

# Assign each technology to its group, comparing in lowercase
for tech, data in tech_experience.items():
    for group, tech_list in groups.items():
        if tech in tech_list:
            grouped_data[group].append({
                'SKILLS': tech.capitalize(),  # Capitalize the first letter of the skill
                'EXPERIENCE IN YEARS': round_experience(data['experience']),
                'LAST USED': data['last_used'].year
            })

# Create a DataFrame to display the results
grouped_rows = []
for group, techs in grouped_data.items():
    first = True
    for tech in techs:
        grouped_rows.append({
            'GROUP': group if first else '',
            'SKILLS': tech['SKILLS'],
            'EXPERIENCE IN YEARS': tech['EXPERIENCE IN YEARS'],
            'LAST USED': tech['LAST USED']
        })
        first = False

# Convert the grouped data into a DataFrame
grouped_df = pd.DataFrame(grouped_rows)

# Display the grouped DataFrame
print(grouped_df.to_string(index=False))
pipeline {
    agent any

    environment {
        APP_NAME = 'fleet-frontend'
        API_BASE =  getApiAddr(env.BRANCH_NAME)
        AUTH_BASE = getApiAddr(env.BRANCH_NAME)
        APP_ENV = getApplicationEnv(env.BRANCH_NAME)
    }
    stages {
        stage('Dockerize') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
                script {
                    docker_image = docker.build(
                        "asia.gcr.io/docker-veep/${APP_NAME}",
                        "--build-arg API_BASE=${env.API_BASE} --build-arg AUTH_BASE=${env.AUTH_BASE} --build-arg APP_ENV_ARG=${env.APP_ENV} ."
                    )
                }
            }
        }

        stage('Publish Docker') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
                script {
                    docker.withRegistry('https://asia.gcr.io', 'gcr:docker-veep') {
                        docker_image.push("${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
                        docker_image.push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            environment {
                DEPLOY_TO = deployTo(env.BRANCH_NAME)
            }
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
                build job: 'dm', parameters: [string(name: 'ENVIRONMENT', value: "${env.DEPLOY_TO}"), string(name: 'APP', value: "${APP_NAME}"), string(name: 'TAG', value: "${env.BRANCH_NAME}-${env.BUILD_NUMBER}")]
            }
        }
    }
}

def getApiAddr(branch) {
    if (branch == 'develop') {
        return 'http://gw.veep.tech/api/v1/fleet'
    } else {
        return 'https://gw.veep.me/api/v1/fleet'
    }
}

def getApplicationEnv(branch) {
    return 'production'
}

def deployTo(branch) {
    if (branch == 'develop') {
        return 'develop'
    } else {
        return 'stage'
    }
}

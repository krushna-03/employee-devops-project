```groovy
pipeline {

    agent any

    options {

        timestamps()
    }

    environment {

        IMAGE_NAME = 'enjetekrushna/employee-pipeline'
    }

    parameters {

        choice(
            name: 'ENVIRONMENT',
            choices: ['DEV', 'QA', 'PROD'],
            description: 'Choose deployment environment'
        )
    }

    stages {

        stage('Build Image') {

            steps {

                retry(2) {

                    sh '''
                    echo "===== TESTING RETRY ====="

                    false
                    '''
                }
            }
        }

        stage('Docker Login') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo "===== LOGIN TO DOCKERHUB ====="

                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Tag Image') {

            steps {

                sh '''
                echo "===== TAG IMAGE ====="

                docker tag employee-app:${BUILD_NUMBER} ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Push Image') {

            steps {

                sh '''
                echo "===== PUSH IMAGE ====="

                docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {

            when {

                expression {

                    params.ENVIRONMENT == 'DEV'
                }
            }

            steps {

                sh '''
                echo "===== HELM DEPLOY ====="

                echo "Selected Environment = ${ENVIRONMENT}"

                helm upgrade --install employee-release ./employee-chart -n dev --set image.tag=${BUILD_NUMBER}
                '''
            }
        }
    }

    post {

        success {

            echo 'PIPELINE SUCCESSFUL'
        }

        failure {

            echo 'PIPELINE FAILED'
        }

        always {

            echo 'PIPELINE FINISHED'
        }
    }
}
```

import json

def lambda_handler(event, context):
    """
    Fonction Lambda qui retourne une réponse JSON
    """
    response_body = {
        'message': 'Hello from Lambda!',
        'status': 'success',
        'version': '2.0'
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(response_body)
    }
from jwt_auth.forms import JSONWebTokenForm


def loginUser(username, password):
    """Should login user and return a jwt token, piggyback on jwt_auth"""
    request = {"username": username, "password": password}
    form = JSONWebTokenForm(request)
    if not form.is_valid():
        return print("JWT form not valid")

    context_dict = {
        'token': form.object['token']
    }

    return context_dict

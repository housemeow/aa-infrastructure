# aa-infrastructure

Repo deploy order:
1. aa-infrastructure
2. aa-frontend

## Trouble shooting

If stack is stuck in UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS state, you can delete the stack with the following command:
```bash
aws cloudformation cancel-update-stack --stack-name AAInfrastructureStackDev
```

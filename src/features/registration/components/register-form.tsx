import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { registerSchema, type RegisterInput } from "../schema";
import { useRegisterMutation } from "../hooks/use-register-mutation";

const FORM_ID = "register-form";

export function RegisterForm() {
  const mutation = useRegisterMutation();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  const isPending = mutation.isPending;

  function onSubmit(values: RegisterInput) {
    mutation.mutate(values);
  }

  return (
    <Card className="w-full bg-transparent ring-0 [--card-spacing:--spacing(6)]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          It takes less than a minute. No credit card needed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id={FORM_ID} noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="register-name"
                    autoComplete="name"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ada Lovelace"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    placeholder="ada@example.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="register-password"
                    type="password"
                    autoComplete="new-password"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-0 bg-transparent pt-2 pb-6">
        <Button
          type="submit"
          form={FORM_ID}
          size="lg"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By signing up you agree to our Terms and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
}

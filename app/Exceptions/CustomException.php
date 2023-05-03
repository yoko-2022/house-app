<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
  protected $message = "Default error message.";

  public function __construct($message = null)
  {
    if (!is_null($message)) {
      $this->message = $message;
    }
  }

  public function report()
  {
    Log::error($exception);
    parent::report($exception);
  }

  public function render($request)
  {
    if ($exception instanceof \App\Exceptions\CustomException) {
      return response()->view(
        "errors.custom",
        ["message" => $exception->getMessage()],
        500
      );
    }

    return parent::render($request, $exception);
  }
}
